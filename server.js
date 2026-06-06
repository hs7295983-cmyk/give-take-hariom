const http = require("http");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");
const fs = require("fs");
const { ensureDb, readDb, writeDb, getStorageInfo } = require("./stateStore");

const rootDir = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "local-admin-1234");
const adminToken = adminPassword
  ? crypto.createHash("sha256").update(`give-and-take-admin:${adminPassword}`).digest("hex")
  : "";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(payload));
}

function sendError(res, status, message) {
  sendJson(res, status, { error: message });
}

function requireAdmin(req, res) {
  const auth = req.headers.authorization || "";
  if (!adminPassword) {
    sendError(res, 503, "Admin password is not configured");
    return false;
  }
  if (auth !== `Bearer ${adminToken}`) {
    sendError(res, 401, "Admin login required");
    return false;
  }
  return true;
}

function id(prefix) {
  return `${prefix}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function parsePath(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  return { url, parts: url.pathname.split("/").filter(Boolean) };
}

function sortProducts(list, sort) {
  const sorters = {
    trending: (a, b) => (b.views + b.sold * 12) - (a.views + a.sold * 12),
    newest: (a, b) => b.newest - a.newest,
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    views: (a, b) => b.views - a.views,
    purchased: (a, b) => b.sold - a.sold
  };
  return [...list].sort(sorters[sort] || sorters.trending);
}

function serviceableCity(db, city) {
  return db.meta.serviceCities.some(item => item.toLowerCase() === String(city || "").toLowerCase());
}

function addLedger(db, userId, type, amount, reason) {
  if (!db.wallets[userId]) db.wallets[userId] = { balance: 0, ledger: [] };
  const signedAmount = type === "debit" ? -Math.abs(amount) : Math.abs(amount);
  db.wallets[userId].balance += signedAmount;
  const entry = {
    id: id("LEDGER"),
    type,
    amount: Math.abs(amount),
    reason,
    createdAt: new Date().toISOString()
  };
  db.wallets[userId].ledger.unshift(entry);
  return entry;
}

async function handleApi(req, res) {
  const db = await readDb();
  const { url, parts } = parsePath(req);
  const method = req.method;

  if (method === "OPTIONS") return sendJson(res, 200, { ok: true });

  if (method === "GET" && parts[1] === "health") {
    return sendJson(res, 200, { ok: true, phase: db.meta.phase, updatedAt: db.meta.updatedAt, storage: getStorageInfo() });
  }

  if (method === "GET" && parts[1] === "config") {
    return sendJson(res, 200, {
      meta: db.meta,
      maintenance: db.maintenance,
      integrations: db.integrations
    });
  }

  if (method === "GET" && parts[1] === "categories") {
    return sendJson(res, 200, { categories: db.categories });
  }

  if (method === "GET" && parts[1] === "products" && parts.length === 2) {
    const category = url.searchParams.get("category") || "all";
    const city = url.searchParams.get("city") || "all";
    const q = (url.searchParams.get("q") || "").toLowerCase();
    const sort = url.searchParams.get("sort") || "trending";
    const products = sortProducts(db.products.filter(product => {
      const matchCategory = category === "all" || product.category === category;
      const matchCity = city === "all" || product.city === city;
      const searchable = `${product.title} ${product.city} ${product.source} ${product.condition}`.toLowerCase();
      const matchQuery = !q || searchable.includes(q);
      return product.status === "listed" && matchCategory && matchCity && matchQuery;
    }), sort);
    return sendJson(res, 200, { products });
  }

  if (method === "GET" && parts[1] === "products" && parts[2]) {
    const product = db.products.find(item => item.id === parts[2]);
    if (!product) return sendError(res, 404, "Product not found");
    return sendJson(res, 200, { product });
  }

  if (method === "GET" && parts[1] === "wallet" && parts[2]) {
    const wallet = db.wallets[parts[2]] || { balance: 0, ledger: [] };
    return sendJson(res, 200, { wallet });
  }

  if (method === "POST" && parts[1] === "wallet" && parts[2] === "recharge") {
    const body = await readBody(req);
    const userId = body.userId || "user-demo";
    const amount = Number(body.amount);
    const paymentMethod = String(body.method || "UPI").toUpperCase();
    if (!Number.isFinite(amount) || amount < db.meta.coinRechargeMinimum || amount % db.meta.coinRechargeStep !== 0) {
      return sendError(res, 400, "Recharge must be minimum 50 and in multiples of 50");
    }
    if (paymentMethod !== "UPI") {
      return sendError(res, 400, "Only UPI recharge is enabled");
    }
    if (!db.integrations.payments.upi?.upiId) {
      return sendError(res, 400, "Admin UPI ID is not configured yet");
    }
    const rechargeRequest = {
      id: id("GT-UPI"),
      userId,
      amount,
      method: "UPI",
      upiId: db.integrations.payments.upi.upiId,
      upiReference: body.upiReference || "",
      status: "pending-admin-verification",
      createdAt: new Date().toISOString()
    };
    if (!db.rechargeRequests) db.rechargeRequests = [];
    db.rechargeRequests.unshift(rechargeRequest);
    await writeDb(db);
    return sendJson(res, 201, { wallet: db.wallets[userId], rechargeRequest, upi: db.integrations.payments.upi });
  }

  if (method === "POST" && parts[1] === "serviceability") {
    const body = await readBody(req);
    return sendJson(res, 200, {
      city: body.city,
      serviceable: serviceableCity(db, body.city),
      activeCities: db.meta.serviceCities
    });
  }

  if (method === "POST" && parts[1] === "sell-requests") {
    const body = await readBody(req);
    if (!serviceableCity(db, body.city)) return sendError(res, 400, "City is not serviceable yet");
    const request = {
      id: id("GT-S"),
      userId: body.userId || "user-demo",
      city: body.city,
      category: body.category,
      title: body.title,
      expectedCoins: Number(body.expectedCoins || 0),
      condition: body.condition,
      details: body.details || {},
      status: "upload-submitted",
      timeline: ["upload-submitted"],
      createdAt: new Date().toISOString()
    };
    db.sellRequests.unshift(request);
    await writeDb(db);
    return sendJson(res, 201, { sellRequest: request });
  }

  if (method === "GET" && parts[1] === "sell-requests") {
    return sendJson(res, 200, { sellRequests: db.sellRequests });
  }

  if (method === "POST" && parts[1] === "orders") {
    const body = await readBody(req);
    const userId = body.userId || "user-demo";
    const productIds = Array.isArray(body.productIds) ? body.productIds : [];
    const selected = productIds.map(productId => db.products.find(product => product.id === productId)).filter(Boolean);
    if (!selected.length) return sendError(res, 400, "No valid products selected");
    if (!serviceableCity(db, body.city)) return sendError(res, 400, "Delivery city is not serviceable yet");
    const totalCoins = selected.reduce((sum, product) => sum + product.price, 0);
    const wallet = db.wallets[userId] || { balance: 0, ledger: [] };
    if (wallet.balance < totalCoins) return sendError(res, 400, "Wallet has insufficient coins");
    addLedger(db, userId, "debit", totalCoins, "Product purchase");
    selected.forEach(product => {
      product.status = "sold";
      product.sold += 1;
    });
    const order = {
      id: id("GT-O"),
      userId,
      productIds,
      totalCoins,
      status: "coins-confirmed",
      deliveryCity: body.city,
      deliveryChargeMode: body.deliveryChargeMode || "cod-rupees",
      timeline: ["order-placed", "coins-confirmed"],
      createdAt: new Date().toISOString()
    };
    db.orders.unshift(order);
    await writeDb(db);
    return sendJson(res, 201, { order, wallet: db.wallets[userId] });
  }

  if (method === "GET" && parts[1] === "orders") {
    const userId = url.searchParams.get("userId");
    const orders = userId ? db.orders.filter(order => order.userId === userId) : db.orders;
    return sendJson(res, 200, { orders });
  }

  if (method === "POST" && parts[1] === "returns") {
    const body = await readBody(req);
    const request = {
      id: id("GT-R"),
      orderId: body.orderId,
      issueCategory: body.issueCategory,
      explanation: body.explanation,
      proofFiles: body.proofFiles || [],
      status: "return-requested",
      createdAt: new Date().toISOString()
    };
    db.returns.unshift(request);
    await writeDb(db);
    return sendJson(res, 201, { returnRequest: request });
  }

  if (method === "POST" && parts[1] === "join-applications") {
    const body = await readBody(req);
    const application = {
      id: id("GT-J"),
      role: body.role,
      city: body.city,
      name: body.name,
      phone: body.phone,
      experience: body.experience,
      status: "submitted",
      createdAt: new Date().toISOString()
    };
    db.joinApplications.unshift(application);
    await writeDb(db);
    return sendJson(res, 201, { application });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "login") {
    const body = await readBody(req);
    if (!adminPassword) return sendError(res, 503, "Admin password is not configured");
    if (body.password !== adminPassword) return sendError(res, 401, "Wrong admin password");
    return sendJson(res, 200, { token: adminToken });
  }

  if (method === "GET" && parts[1] === "partner" && parts[2] === "tasks") {
    if (!requireAdmin(req, res)) return;
    return sendJson(res, 200, { tasks: db.partnerTasks });
  }

  if (method === "PATCH" && parts[1] === "partner" && parts[2] === "tasks" && parts[3]) {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const task = db.partnerTasks.find(item => item.id === parts[3]);
    if (!task) return sendError(res, 404, "Partner task not found");
    task.status = body.status || task.status;
    task.proof = body.proof || task.proof || {};
    task.updatedAt = new Date().toISOString();
    await writeDb(db);
    return sendJson(res, 200, { task });
  }

  if (method === "GET" && parts[1] === "admin" && parts[2] === "dashboard") {
    if (!requireAdmin(req, res)) return;
    return sendJson(res, 200, {
      counts: {
        users: db.users.length,
        products: db.products.length,
        listedProducts: db.products.filter(product => product.status === "listed").length,
        sellRequests: db.sellRequests.length,
        partnerTasks: db.partnerTasks.length,
        orders: db.orders.length,
        returns: db.returns.length,
        rechargeRequests: (db.rechargeRequests || []).length,
        joinApplications: db.joinApplications.length
      },
      maintenance: db.maintenance,
      integrations: db.integrations,
      rechargeRequests: db.rechargeRequests || [],
      joinApplications: db.joinApplications || []
    });
  }

  if (method === "PATCH" && parts[1] === "admin" && parts[2] === "payments" && parts[3] === "upi") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const upiId = String(body.upiId || "").trim();
    if (!upiId || !upiId.includes("@")) return sendError(res, 400, "Enter a valid UPI ID");
    db.integrations.payments.upi = {
      merchantName: String(body.merchantName || "GIVE & TAKE").trim(),
      upiId,
      note: String(body.note || "").trim()
    };
    db.integrations.payments.status = "manual-upi-verification";
    await writeDb(db);
    return sendJson(res, 200, { upi: db.integrations.payments.upi });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "recharges" && parts[3] && parts[4] === "approve") {
    if (!requireAdmin(req, res)) return;
    const rechargeRequest = (db.rechargeRequests || []).find(item => item.id === parts[3]);
    if (!rechargeRequest) return sendError(res, 404, "Recharge request not found");
    if (rechargeRequest.status === "approved") return sendError(res, 400, "Recharge request already approved");
    const entry = addLedger(db, rechargeRequest.userId, "credit", rechargeRequest.amount, `UPI recharge approved: ${rechargeRequest.id}`);
    rechargeRequest.status = "approved";
    rechargeRequest.approvedAt = new Date().toISOString();
    rechargeRequest.ledgerId = entry.id;
    await writeDb(db);
    return sendJson(res, 200, { rechargeRequest, wallet: db.wallets[rechargeRequest.userId], entry });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "recharges" && parts[3] && parts[4] === "reject") {
    if (!requireAdmin(req, res)) return;
    const rechargeRequest = (db.rechargeRequests || []).find(item => item.id === parts[3]);
    if (!rechargeRequest) return sendError(res, 404, "Recharge request not found");
    if (rechargeRequest.status === "approved") return sendError(res, 400, "Approved recharge cannot be rejected");
    rechargeRequest.status = "rejected";
    rechargeRequest.rejectedAt = new Date().toISOString();
    await writeDb(db);
    return sendJson(res, 200, { rechargeRequest });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "join-applications" && parts[3] && ["accept", "reject"].includes(parts[4])) {
    if (!requireAdmin(req, res)) return;
    const application = (db.joinApplications || []).find(item => item.id === parts[3]);
    if (!application) return sendError(res, 404, "Join application not found");
    if (application.status !== "submitted") return sendError(res, 400, "Join application already reviewed");
    const accepted = parts[4] === "accept";
    application.status = accepted ? "accepted" : "rejected";
    application.reviewedAt = new Date().toISOString();
    application.reviewDecision = application.status;
    await writeDb(db);
    return sendJson(res, 200, { application });
  }

  if (method === "PATCH" && parts[1] === "admin" && parts[2] === "maintenance") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    db.maintenance = { ...db.maintenance, ...body };
    await writeDb(db);
    return sendJson(res, 200, { maintenance: db.maintenance });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "products") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const product = {
      id: id("p"),
      title: body.title,
      category: body.category,
      city: body.city,
      price: Number(body.price || 0),
      condition: body.condition || "Good",
      source: body.source || "GIVE & TAKE Verified",
      views: 0,
      sold: 0,
      badges: body.badges || ["Verified"],
      checks: body.checks || ["Warehouse checked"],
      artA: body.artA || "#d3f4e9",
      artB: body.artB || "#3a6e63",
      status: "listed",
      quantity: Number(body.quantity || 1),
      newest: db.products.length + 1,
      returnWindowHours: 48,
      owner: "give-and-take",
      sourceType: "admin-inventory"
    };
    db.products.unshift(product);
    await writeDb(db);
    return sendJson(res, 201, { product });
  }

  return sendError(res, 404, "API route not found");
}

function serveStatic(req, res) {
  const { url } = parsePath(req);
  let filePath = decodeURIComponent(url.pathname);
  if (filePath === "/") filePath = "/index.html";
  const resolved = path.normalize(path.join(rootDir, filePath));
  if (!resolved.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(resolved, (error, content) => {
    if (error) {
      fs.readFile(path.join(rootDir, "index.html"), (fallbackError, fallback) => {
        if (fallbackError) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(fallback);
      });
      return;
    }
    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }
    serveStatic(req, res);
  } catch (error) {
    sendError(res, 500, error.message || "Server error");
  }
});

ensureDb()
  .then(() => {
    server.listen(port, () => {
      console.log(`GIVE & TAKE backend running at http://localhost:${port}`);
      console.log(`Storage mode: ${getStorageInfo().mode}`);
    });
  })
  .catch(error => {
    console.error("Failed to initialize storage:", error);
    process.exit(1);
  });
