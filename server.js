const http = require("http");
const https = require("https");
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
const brevoApiKey = process.env.BREVO_API_KEY || "";
const otpFromEmail = process.env.OTP_FROM_EMAIL || "giveandtake.support@gmail.com";
const otpFromName = process.env.OTP_FROM_NAME || "GIVE & TAKE";
const sessionSecret = process.env.SESSION_SECRET || (process.env.NODE_ENV === "production" ? "" : "local-session-secret");
const customerSessionDays = Number(process.env.CUSTOMER_SESSION_DAYS || 365);
const deliveryCharge = 50;
const deliveryFreeThreshold = 499;

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
      if (body.length > 2_500_000) {
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

function productSummary(product) {
  const { images, checks, supplierUrl, ...summary } = product;
  return {
    ...summary,
    imageCount: Array.isArray(images) ? images.length : 0
  };
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

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function hashOtp(email, otp) {
  return crypto.createHash("sha256").update(`${sessionSecret}:${normalizeEmail(email)}:${otp}`).digest("hex");
}

function hashSession(token) {
  return crypto.createHash("sha256").update(`${sessionSecret}:${token}`).digest("hex");
}

function publicUser(user) {
  return user ? { id: user.id, email: user.email, name: user.name || "", addressBook: user.addressBook || null } : null;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

async function sendBrevoEmail({ to, subject, htmlContent, textContent }) {
  if (!brevoApiKey) throw new Error("Brevo API key is not configured");
  const payload = JSON.stringify({
    sender: { name: otpFromName, email: otpFromEmail },
    to: [{ email: to }],
    subject,
    htmlContent,
    textContent
  });
  await new Promise((resolve, reject) => {
    const request = https.request({
      hostname: "api.brevo.com",
      path: "/v3/smtp/email",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
        "api-key": brevoApiKey
      }
    }, response => {
      let body = "";
      response.on("data", chunk => { body += chunk; });
      response.on("end", () => {
        if (response.statusCode >= 200 && response.statusCode < 300) return resolve();
        reject(new Error(`Brevo email failed: ${body || response.statusCode}`));
      });
    });
    request.on("error", reject);
    request.write(payload);
    request.end();
  });
}

async function sendOtpEmail(email, otp) {
  await sendBrevoEmail({
    to: email,
    subject: "Your GIVE & TAKE login OTP",
    htmlContent: `<p>Your GIVE & TAKE login OTP is <strong>${otp}</strong>.</p><p>This OTP expires in 5 minutes.</p>`,
    textContent: `Your GIVE & TAKE login OTP is ${otp}. This OTP expires in 5 minutes.`
  });
}

async function sendOrderConfirmationEmail(email, order) {
  if (!email) throw new Error("Customer email is not available");
  const counts = order.productIds.reduce((map, productId) => map.set(productId, (map.get(productId) || 0) + 1), new Map());
  const productRows = [...counts.entries()].map(([productId, qty]) => {
    const product = order.products.find(item => item.id === productId) || { title: "Product", price: 0 };
    return { product, qty };
  });
  const customerName = order.deliveryDetails.name || "Customer";
  const address = [
    order.deliveryDetails.name,
    order.deliveryDetails.address,
    order.deliveryDetails.city,
    order.deliveryDetails.pincode,
    order.deliveryDetails.landmark ? `Near ${order.deliveryDetails.landmark}` : ""
  ].filter(Boolean).join(" • ");
  const status = String(order.status || "new-order").replaceAll("-", " ");
  const itemsHtml = productRows.map(({ product }) => `<li>${escapeHtml(product.title)}</li>`).join("");
  const quantityHtml = productRows.map(({ product, qty }) => `<li>${escapeHtml(product.title)}: ${qty}</li>`).join("");
  const textItems = productRows.map(({ product }) => `- ${product.title}`).join("\n");
  const textQuantities = productRows.map(({ product, qty }) => `- ${product.title}: ${qty}`).join("\n");
  await sendBrevoEmail({
    to: email,
    subject: "Your GIVE & TAKE order is confirmed",
    htmlContent: `
      <div style="font-family:Arial,sans-serif;color:#1f2937;line-height:1.5;">
        <p>Hi ${escapeHtml(customerName)},</p>
        <p>Your order has been successfully placed.</p>
        <p><strong>Order Details:</strong></p>
        <p><strong>Order ID:</strong> ${escapeHtml(order.id)}</p>
        <p><strong>Items:</strong></p>
        <ul>${itemsHtml}</ul>
        <p><strong>Quantity:</strong></p>
        <ul>${quantityHtml}</ul>
        <p><strong>Total G&T Coins:</strong> ${order.totalCoins}</p>
        <p><strong>Delivery Address:</strong> ${escapeHtml(address)}</p>
        <p><strong>Order Status:</strong> ${escapeHtml(status)}</p>
        <p>You can view your order anytime from My Orders.</p>
        <p>Thank you,<br/>GIVE & TAKE</p>
      </div>
    `,
    textContent: `Hi ${customerName},

Your order has been successfully placed.

Order Details:
Order ID: ${order.id}
Items:
${textItems}
Quantity:
${textQuantities}
Total G&T Coins: ${order.totalCoins}
Delivery Address: ${address}
Order Status: ${status}

You can view your order anytime from My Orders.

Thank you,
GIVE & TAKE`
  });
}

function normalizeComparableTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(word => word.length > 2 && !["with", "for", "and", "the", "new", "pcs", "piece", "pack", "set"].includes(word))
    .join(" ")
    .trim();
}

function similarityScore(a, b) {
  const aWords = new Set(normalizeComparableTitle(a).split(" ").filter(Boolean));
  const bWords = new Set(normalizeComparableTitle(b).split(" ").filter(Boolean));
  if (!aWords.size || !bWords.size) return 0;
  const intersection = [...aWords].filter(word => bWords.has(word)).length;
  const union = new Set([...aWords, ...bWords]).size;
  return intersection / union;
}

function buildInventoryIssues(products) {
  const issues = [];
  (products || []).forEach(product => {
    const tags = [];
    if (!String(product.title || "").trim()) tags.push("missing-title");
    if (!String(product.category || "").trim()) tags.push("missing-category");
    if (!Number.isFinite(Number(product.price)) || Number(product.price) <= 0) tags.push("zero-or-invalid-price");
    if (!String(product.imageUrl || "").trim() && !(Array.isArray(product.images) && product.images.length)) tags.push("missing-image");
    if (product.status && product.status !== "listed") tags.push(product.status === "sold" ? "sold-product" : "not-listed");
    if (tags.length) {
      issues.push({
        id: product.id,
        title: product.title || "Untitled product",
        category: product.category || "",
        price: Number(product.price || 0),
        status: product.status || "unknown",
        tags
      });
    }
  });
  return issues;
}

function buildDuplicateGroups(products) {
  const groups = [];
  const used = new Set();
  const list = products || [];
  for (let i = 0; i < list.length; i += 1) {
    const first = list[i];
    if (!first?.id || used.has(first.id)) continue;
    const matches = [];
    for (let j = i + 1; j < list.length; j += 1) {
      const second = list[j];
      if (!second?.id || used.has(second.id)) continue;
      const score = similarityScore(first.title, second.title);
      if (score >= 0.72) {
        matches.push({
          id: second.id,
          title: second.title,
          price: Number(second.price || 0),
          status: second.status || "unknown",
          score: Number(score.toFixed(2))
        });
      }
    }
    if (matches.length) {
      used.add(first.id);
      matches.forEach(match => used.add(match.id));
      groups.push({
        title: first.title,
        products: [
          { id: first.id, title: first.title, price: Number(first.price || 0), status: first.status || "unknown", score: 1 },
          ...matches
        ]
      });
    }
  }
  return groups.slice(0, 20);
}

function summarizeAdminOrders(orders) {
  return (orders || [])
    .filter(order => !["delivered", "cancelled"].includes(String(order.status || "").toLowerCase()))
    .slice(0, 20)
    .map(order => {
      const details = order.deliveryDetails || {};
      const status = String(order.status || "new-order").toLowerCase();
      const nextAction = status === "new-order"
        ? "Confirm order"
        : status === "confirmed"
          ? "Pack order"
          : status === "packed"
            ? "Mark out for delivery"
            : status === "out-for-delivery"
              ? "Follow up until delivered"
              : "Review status";
      return {
        id: order.id,
        status,
        customer: details.name || order.userEmail || order.userId || "Customer",
        phone: details.phone || "",
        city: details.city || order.deliveryCity || "",
        coins: Number(order.totalCoins || 0),
        products: (order.products || []).map(product => product.title || product.id).filter(Boolean),
        nextAction
      };
    });
}

function buildPriceHealth(products, clientCatalog) {
  const clientById = new Map((clientCatalog || []).map(product => [product.id, product]));
  return (products || []).map(product => {
    const clientProduct = clientById.get(product.id);
    const backendPrice = Number(product.price || 0);
    const browserPrice = clientProduct ? Number(clientProduct.price || 0) : null;
    return {
      id: product.id,
      title: product.title || "Untitled product",
      backendPrice,
      browserPrice,
      status: product.status || "unknown",
      ok: browserPrice === null || backendPrice === browserPrice,
      note: browserPrice === null
        ? "Not present in browser catalog snapshot"
        : backendPrice === browserPrice
          ? "Browser and backend match"
          : "Browser cached price differs from backend"
    };
  }).filter(item => !item.ok || item.backendPrice <= 0).slice(0, 30);
}

function draftListingFallback(input, categories) {
  const rawTitle = String(input?.title || input?.name || input?.details || "New product").trim();
  const title = rawTitle
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase())
    .slice(0, 110);
  const details = `${rawTitle} ${input?.details || ""} ${input?.url || ""}`.toLowerCase();
  const category = (categories || []).find(item => details.includes(item.id) || details.includes(String(item.name || "").toLowerCase()))?.id
    || (details.includes("phone") || details.includes("earbud") || details.includes("usb") || details.includes("bluetooth") ? "electronics"
      : details.includes("kitchen") || details.includes("bottle") || details.includes("lamp") ? "home"
        : "home");
  const price = Number(input?.price || input?.targetPrice || 0) || 50;
  return {
    title,
    category,
    price,
    condition: input?.condition || "New",
    checks: ["Warehouse checked", "Image verified", "Admin price editable"],
    badges: ["GIVE & TAKE Verified", "AI Draft"],
    description: String(input?.details || "Useful verified product for GIVE & TAKE customers.").slice(0, 240)
  };
}

function buildOpsSnapshot(db, clientCatalog, listingInput) {
  const products = db.products || [];
  const activeOrders = (db.orders || []).filter(order => !order.adminArchived);
  const localReport = {
    counts: {
      products: products.length,
      listedProducts: products.filter(product => product.status === "listed").length,
      activeOrders: activeOrders.length,
      pendingOrders: activeOrders.filter(order => !["delivered", "cancelled"].includes(String(order.status || "").toLowerCase())).length,
      zeroPriceProducts: products.filter(product => Number(product.price || 0) <= 0).length
    },
    inventoryIssues: buildInventoryIssues(products).slice(0, 40),
    duplicateGroups: buildDuplicateGroups(products),
    orderSummaries: summarizeAdminOrders(activeOrders),
    priceHealth: buildPriceHealth(products, clientCatalog),
    listingDraft: draftListingFallback(listingInput || {}, db.categories || [])
  };
  return localReport;
}

function extractResponseText(response) {
  if (typeof response.output_text === "string") return response.output_text;
  return (response.output || [])
    .flatMap(item => item.content || [])
    .filter(content => content.type === "output_text" && typeof content.text === "string")
    .map(content => content.text)
    .join("\n")
    .trim();
}

async function callOpenAiAdminAgent({ action, prompt, localReport, listingInput, supportInput }) {
  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) {
    return { enabled: false, model: null, report: null, error: "OPENAI_API_KEY is not configured" };
  }
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const schema = {
    type: "object",
    additionalProperties: true,
    properties: {
      summary: { type: "string" },
      priority: { type: "string" },
      insights: { type: "array", items: { type: "string" } },
      actions: { type: "array", items: { type: "string" } },
      inventoryIssues: { type: "array", items: { type: "object", additionalProperties: true } },
      duplicateGroups: { type: "array", items: { type: "object", additionalProperties: true } },
      orderSummaries: { type: "array", items: { type: "object", additionalProperties: true } },
      priceHealth: { type: "array", items: { type: "object", additionalProperties: true } },
      listingDraft: { type: "object", additionalProperties: true },
      supportDrafts: { type: "array", items: { type: "object", additionalProperties: true } }
    }
  };
  const payload = {
    model,
    instructions: [
      "You are GIVE & TAKE Admin Ops Agent for a coin-based reuse marketplace in India.",
      "Be operational, concise, and action-first. Do not invent private data.",
      "Use supplied products, orders, inventory diagnostics, and listing input only.",
      "Return JSON matching the schema. Keep customer-facing support drafts polite and short."
    ].join(" "),
    input: JSON.stringify({
      action,
      adminPrompt: prompt || "",
      localReport,
      listingInput: listingInput || {},
      supportInput: supportInput || {}
    }),
    max_output_tokens: 1800,
    text: {
      format: {
        type: "json_schema",
        name: "admin_ops_agent_result",
        schema
      }
    }
  };
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`OpenAI API failed: ${body || response.status}`);
  const data = JSON.parse(body);
  const text = extractResponseText(data);
  return {
    enabled: true,
    model,
    report: text ? JSON.parse(text) : null,
    usage: data.usage || null
  };
}

async function handleApi(req, res) {
  const db = await readDb();
  const { url, parts } = parsePath(req);
  const method = req.method;

  if (method === "OPTIONS") return sendJson(res, 200, { ok: true });

  if (method === "GET" && parts[1] === "health") {
    return sendJson(res, 200, { ok: true, phase: db.meta.phase, updatedAt: db.meta.updatedAt, storage: getStorageInfo() });
  }

  if (method === "POST" && parts[1] === "auth" && parts[2] === "request-otp") {
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    if (!email || !email.includes("@")) return sendError(res, 400, "Enter a valid email");
    if (!sessionSecret) return sendError(res, 503, "Session secret is not configured");
    db.authOtps = db.authOtps || [];
    const now = Date.now();
    const recent = db.authOtps.find(item => item.email === email && item.createdAtMs && now - item.createdAtMs < 60_000);
    if (recent) return sendError(res, 429, "Please wait before requesting another OTP");
    const otp = String(crypto.randomInt(100000, 1000000));
    const otpRecord = {
      id: id("OTP"),
      email,
      otpHash: hashOtp(email, otp),
      expiresAt: new Date(now + 5 * 60_000).toISOString(),
      createdAt: new Date(now).toISOString(),
      createdAtMs: now,
      attempts: 0,
      used: false
    };
    db.authOtps = db.authOtps.filter(item => new Date(item.expiresAt).getTime() > now && !item.used).slice(0, 100);
    db.authOtps.unshift(otpRecord);
    await writeDb(db);
    try {
      await sendOtpEmail(email, otp);
    } catch (error) {
      otpRecord.used = true;
      await writeDb(db);
      return sendError(res, 503, error.message);
    }
    return sendJson(res, 200, { ok: true, expiresInSeconds: 300 });
  }

  if (method === "POST" && parts[1] === "auth" && parts[2] === "verify-otp") {
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    const otp = String(body.otp || "").trim();
    const name = String(body.name || "").trim();
    if (!email || !otp) return sendError(res, 400, "Email and OTP are required");
    if (!sessionSecret) return sendError(res, 503, "Session secret is not configured");
    db.authOtps = db.authOtps || [];
    db.authSessions = db.authSessions || [];
    db.users = db.users || [];
    const now = Date.now();
    const record = db.authOtps.find(item => item.email === email && !item.used);
    if (!record) return sendError(res, 400, "OTP not found. Please request a new OTP");
    if (new Date(record.expiresAt).getTime() < now) return sendError(res, 400, "OTP expired. Please request a new OTP");
    if (record.attempts >= 5) return sendError(res, 429, "Too many OTP attempts. Please request a new OTP");
    record.attempts += 1;
    if (record.otpHash !== hashOtp(email, otp)) {
      await writeDb(db);
      return sendError(res, 401, "Wrong OTP");
    }
    record.used = true;
    let user = db.users.find(item => normalizeEmail(item.email) === email);
    if (!user) {
      user = { id: id("USER"), email, name, createdAt: new Date().toISOString() };
      db.users.push(user);
    } else if (name) {
      user.name = name;
      user.updatedAt = new Date().toISOString();
    }
    const token = crypto.randomBytes(32).toString("hex");
    const sessionDurationMs = customerSessionDays * 24 * 60 * 60_000;
    const session = {
      id: id("SESSION"),
      userId: user.id,
      email,
      tokenHash: hashSession(token),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + sessionDurationMs).toISOString()
    };
    db.authSessions = db.authSessions.filter(item => new Date(item.expiresAt).getTime() > now).slice(0, 200);
    db.authSessions.unshift(session);
    if (!db.wallets[user.id]) db.wallets[user.id] = { balance: 0, ledger: [] };
    await writeDb(db);
    return sendJson(res, 200, { token, user: publicUser(user), wallet: db.wallets[user.id] });
  }

  if (method === "GET" && parts[1] === "auth" && parts[2] === "me") {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token || !sessionSecret) return sendError(res, 401, "Login required");
    db.authSessions = db.authSessions || [];
    const session = db.authSessions.find(item => item.tokenHash === hashSession(token) && new Date(item.expiresAt).getTime() > Date.now());
    if (!session) return sendError(res, 401, "Session expired");
    const user = (db.users || []).find(item => item.id === session.userId);
    if (!user) return sendError(res, 401, "User not found");
    const now = Date.now();
    const sessionDurationMs = customerSessionDays * 24 * 60 * 60_000;
    const remainingMs = new Date(session.expiresAt).getTime() - now;
    if (remainingMs < 30 * 24 * 60 * 60_000) {
      session.expiresAt = new Date(now + sessionDurationMs).toISOString();
      session.lastSeenAt = new Date(now).toISOString();
      await writeDb(db);
    }
    return sendJson(res, 200, { user: publicUser(user), wallet: db.wallets?.[user.id] || { balance: 0, ledger: [] } });
  }

  if (method === "POST" && parts[1] === "auth" && parts[2] === "logout") {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (token && sessionSecret) {
      db.authSessions = (db.authSessions || []).filter(item => item.tokenHash !== hashSession(token));
      await writeDb(db);
    }
    return sendJson(res, 200, { ok: true });
  }

  if (method === "PATCH" && parts[1] === "auth" && parts[2] === "address") {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token || !sessionSecret) return sendError(res, 401, "Login required");
    db.authSessions = db.authSessions || [];
    const session = db.authSessions.find(item => item.tokenHash === hashSession(token) && new Date(item.expiresAt).getTime() > Date.now());
    if (!session) return sendError(res, 401, "Session expired");
    const user = (db.users || []).find(item => item.id === session.userId);
    if (!user) return sendError(res, 401, "User not found");
    const body = await readBody(req);
    const addressBook = {
      name: String(body.name || "").trim(),
      phone: String(body.phone || "").trim(),
      houseArea: String(body.houseArea || "").trim(),
      city: String(body.city || "").trim(),
      pincode: String(body.pincode || "").trim(),
      landmark: String(body.landmark || "").trim(),
    };
    if (!addressBook.name) return sendError(res, 400, "Name is required");
    if (!addressBook.phone) return sendError(res, 400, "Phone number is required");
    if (!addressBook.houseArea) return sendError(res, 400, "House/area is required");
    if (!serviceableCity(db, addressBook.city)) return sendError(res, 400, "City is not serviceable yet");
    if (!addressBook.pincode) return sendError(res, 400, "Pincode is required");
    user.addressBook = addressBook;
    user.updatedAt = new Date().toISOString();
    await writeDb(db);
    return sendJson(res, 200, { user: publicUser(user) });
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
    }), sort).map(productSummary);
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
    const userId = String(body.userId || "").trim();
    if (!userId) return sendError(res, 401, "Login required");
    if (!db.wallets[userId]) db.wallets[userId] = { balance: 0, ledger: [] };
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
      userEmail: body.userEmail || "",
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
    const sellerPhone = String(body.sellerPhone || "").trim();
    if (!sellerPhone) return sendError(res, 400, "Seller phone number is required for pickup");
    const photos = Array.isArray(body.photos)
      ? body.photos.filter(photo => typeof photo === "string" && photo.startsWith("data:image/"))
      : [];
    if (photos.length < 4 || photos.length > 5) return sendError(res, 400, "Please upload minimum 4 and maximum 5 product photos");
    const request = {
      id: id("GT-S"),
      userId: String(body.userId || "").trim(),
      userEmail: body.userEmail || "",
      sellerName: String(body.sellerName || "").trim(),
      sellerPhone,
      pickupAddress: String(body.pickupAddress || "").trim(),
      pickupDate: String(body.pickupDate || "").trim(),
      pickupTime: String(body.pickupTime || "").trim(),
      city: body.city,
      category: body.category,
      title: body.title,
      expectedCoins: Number(body.expectedCoins || 0),
      condition: body.condition,
      details: body.details || {},
      photos,
      status: "upload-submitted",
      timeline: ["upload-submitted"],
      createdAt: new Date().toISOString()
    };
    if (!request.userId) return sendError(res, 401, "Login required");
    db.sellRequests.unshift(request);
    await writeDb(db);
    return sendJson(res, 201, { sellRequest: request });
  }

  if (method === "GET" && parts[1] === "sell-requests") {
    const userId = url.searchParams.get("userId");
    const sellRequests = userId ? db.sellRequests.filter(request => request.userId === userId) : db.sellRequests;
    return sendJson(res, 200, { sellRequests });
  }

  if (method === "POST" && parts[1] === "orders") {
    const body = await readBody(req);
    const userId = String(body.userId || "").trim();
    if (!userId) return sendError(res, 401, "Login required");
    const productIds = Array.isArray(body.productIds) ? body.productIds : [];
    const selected = productIds.map(productId => db.products.find(product => product.id === productId)).filter(Boolean);
    if (!selected.length) return sendError(res, 400, "No valid products selected");
    const deliveryDetails = body.deliveryDetails || {};
    const deliveryCity = deliveryDetails.city || body.city;
    if (!serviceableCity(db, deliveryCity)) return sendError(res, 400, "Delivery city is not serviceable yet");
    if (!String(deliveryDetails.name || "").trim()) return sendError(res, 400, "Customer name is required");
    if (!String(deliveryDetails.phone || "").trim()) return sendError(res, 400, "Customer phone is required");
    if (!String(deliveryDetails.address || "").trim()) return sendError(res, 400, "Delivery address is required");
    const totalCoins = selected.reduce((sum, product) => sum + product.price, 0);
    const orderDeliveryCharge = totalCoins > deliveryFreeThreshold ? 0 : deliveryCharge;
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
      userEmail: body.userEmail || "",
      productIds,
      products: selected.map((product, index) => ({
        id: product.id,
        productId: productIds[index] || product.id,
        title: product.title,
        price: product.price,
        condition: product.condition,
        category: product.category,
        imageUrl: product.imageUrl || "",
        images: Array.isArray(product.images) ? product.images : []
      })),
      totalCoins,
      status: "new-order",
      deliveryCity,
      deliveryDetails: {
        name: String(deliveryDetails.name || "").trim(),
        phone: String(deliveryDetails.phone || "").trim(),
        address: String(deliveryDetails.address || "").trim(),
        city: deliveryCity,
        pincode: String(deliveryDetails.pincode || "").trim(),
        landmark: String(deliveryDetails.landmark || "").trim(),
        note: String(deliveryDetails.note || "").trim()
      },
      deliveryCharge: orderDeliveryCharge,
      deliveryFreeThreshold,
      deliveryChargeMode: body.deliveryChargeMode || "cod-rupees",
      timeline: ["order-placed", "coins-deducted", "new-order"],
      createdAt: new Date().toISOString()
    };
    const user = (db.users || []).find(item => item.id === userId);
    if (user) {
      user.addressBook = {
        name: order.deliveryDetails.name,
        phone: order.deliveryDetails.phone,
        houseArea: order.deliveryDetails.address,
        city: order.deliveryDetails.city,
        pincode: order.deliveryDetails.pincode,
        landmark: order.deliveryDetails.landmark,
      };
      user.updatedAt = new Date().toISOString();
    }
    db.orders.unshift(order);
    await writeDb(db);
    let confirmationEmailSent = false;
    let confirmationEmailWarning = "";
    try {
      await sendOrderConfirmationEmail(order.userEmail, order);
      confirmationEmailSent = true;
    } catch (error) {
      confirmationEmailWarning = "Order placed, but confirmation email could not be sent.";
      console.warn(`${confirmationEmailWarning} ${error.message}`);
    }
    return sendJson(res, 201, { order, wallet: db.wallets[userId], user: publicUser(user), confirmationEmailSent, confirmationEmailWarning });
  }

  if (method === "GET" && parts[1] === "orders") {
    const userId = url.searchParams.get("userId");
    const orders = userId ? db.orders.filter(order => order.userId === userId) : db.orders;
    return sendJson(res, 200, { orders });
  }

  if (method === "PATCH" && parts[1] === "admin" && parts[2] === "orders" && parts[3]) {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const order = db.orders.find(item => item.id === parts[3]);
    if (!order) return sendError(res, 404, "Order not found");
    const allowedStatuses = ["new-order", "confirmed", "packed", "out-for-delivery", "delivered", "cancelled"];
    if (!allowedStatuses.includes(body.status)) return sendError(res, 400, "Invalid order status");
    if (body.status === "cancelled") {
      const cancellationReason = String(body.cancellationReason || "").trim();
      if (!cancellationReason) return sendError(res, 400, "Cancellation reason is required");
      order.cancellationReason = cancellationReason;
      order.cancelledAt = new Date().toISOString();
    }
    order.status = body.status;
    order.timeline = Array.isArray(order.timeline) ? order.timeline : [];
    if (!order.timeline.includes(body.status)) order.timeline.push(body.status);
    order.updatedAt = new Date().toISOString();
    await writeDb(db);
    return sendJson(res, 200, { order });
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
    const summaryOnly = url.searchParams.get("summary") === "1";
    const visibleOrders = (db.orders || []).filter(item => !item.adminArchived);
    const visibleSellRequests = (db.sellRequests || []).filter(item => !item.adminArchived);
    const visibleRechargeRequests = (db.rechargeRequests || []).filter(item => !item.adminArchived);
    const visibleJoinApplications = (db.joinApplications || []).filter(item => !item.adminArchived);
    const archived = {
      orders: (db.orders || []).filter(item => item.adminArchived),
      sellRequests: (db.sellRequests || []).filter(item => item.adminArchived),
      rechargeRequests: (db.rechargeRequests || []).filter(item => item.adminArchived),
      joinApplications: (db.joinApplications || []).filter(item => item.adminArchived)
    };
    const adminProducts = (db.products || []).map(product => ({
      id: product.id,
      title: product.title,
      category: product.category,
      condition: product.condition,
      status: product.status,
      price: product.price,
      imageUrl: product.imageUrl || "",
      images: Array.isArray(product.images) ? product.images.slice(0, 1) : [],
      artA: product.artA,
      artB: product.artB
    }));
    const summarizeOrder = order => ({
      ...order,
      products: (order.products || []).map(product => ({
        id: product.id,
        productId: product.productId || product.id,
        title: product.title,
        price: product.price,
        condition: product.condition,
        category: product.category,
        imageUrl: product.imageUrl || ""
      }))
    });
    const summarizeSellRequest = request => ({
      ...request,
      photoCount: Array.isArray(request.photos) ? request.photos.length : 0,
      photos: []
    });
    const summarizeArchive = archive => ({
      orders: (archive.orders || []).map(summarizeOrder),
      sellRequests: (archive.sellRequests || []).map(summarizeSellRequest),
      rechargeRequests: archive.rechargeRequests || [],
      joinApplications: archive.joinApplications || []
    });
    return sendJson(res, 200, {
      summary: summaryOnly,
      counts: {
        users: db.users.length,
        products: db.products.length,
        listedProducts: db.products.filter(product => product.status === "listed").length,
        sellRequests: visibleSellRequests.length,
        partnerTasks: db.partnerTasks.length,
        orders: visibleOrders.length,
        returns: db.returns.length,
        rechargeRequests: visibleRechargeRequests.length,
        joinApplications: visibleJoinApplications.length
      },
      maintenance: db.maintenance,
      integrations: db.integrations,
      products: adminProducts,
      orders: summaryOnly ? visibleOrders.map(summarizeOrder) : visibleOrders,
      sellRequests: summaryOnly ? visibleSellRequests.map(summarizeSellRequest) : visibleSellRequests,
      rechargeRequests: visibleRechargeRequests,
      joinApplications: visibleJoinApplications,
      archived: summaryOnly ? summarizeArchive(archived) : archived
    });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "ops-agent") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const action = String(body.action || "audit").trim() || "audit";
    const listingInput = body.listingInput || {};
    const supportInput = body.supportInput || {};
    const prompt = String(body.prompt || "").trim();
    const clientCatalog = Array.isArray(body.clientCatalog) ? body.clientCatalog.slice(0, 300) : [];
    const localReport = buildOpsSnapshot(db, clientCatalog, listingInput);
    let ai = null;
    try {
      ai = await callOpenAiAdminAgent({ action, prompt, localReport, listingInput, supportInput });
    } catch (error) {
      ai = {
        enabled: Boolean(process.env.OPENAI_API_KEY),
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        report: null,
        error: error.message
      };
    }
    const fallbackReport = {
      summary: "Local admin diagnostics are ready. Configure OPENAI_API_KEY for AI-written recommendations.",
      priority: localReport.inventoryIssues.length || localReport.priceHealth.length ? "Review inventory issues" : "Healthy",
      insights: [
        `${localReport.counts.zeroPriceProducts} products have zero or invalid price.`,
        `${localReport.duplicateGroups.length} possible duplicate product groups found.`,
        `${localReport.counts.pendingOrders} active orders need admin action.`
      ],
      actions: localReport.orderSummaries.slice(0, 5).map(order => `${order.id}: ${order.nextAction}`),
      inventoryIssues: localReport.inventoryIssues,
      duplicateGroups: localReport.duplicateGroups,
      orderSummaries: localReport.orderSummaries,
      priceHealth: localReport.priceHealth,
      listingDraft: localReport.listingDraft,
      supportDrafts: supportInput?.query ? [{
        title: "Support reply draft",
        text: `Hi, thanks for contacting GIVE & TAKE. We are checking your request: ${String(supportInput.query).slice(0, 160)}. We will update you shortly.`
      }] : []
    };
    return sendJson(res, 200, {
      action,
      generatedAt: new Date().toISOString(),
      ai: {
        ...ai,
        report: ai?.report || fallbackReport
      },
      localReport
    });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "archive") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const collections = {
      orders: db.orders || [],
      sellRequests: db.sellRequests || [],
      rechargeRequests: db.rechargeRequests || [],
      joinApplications: db.joinApplications || []
    };
    const collection = collections[body.type];
    if (!collection) return sendError(res, 400, "Invalid archive type");
    const item = collection.find(next => next.id === body.id);
    if (!item) return sendError(res, 404, "Item not found");
    const shouldArchive = body.archived !== false;
    item.adminArchived = shouldArchive;
    item.adminArchivedAt = shouldArchive ? new Date().toISOString() : item.adminArchivedAt;
    if (!shouldArchive) item.adminUnarchivedAt = new Date().toISOString();
    await writeDb(db);
    return sendJson(res, 200, { archived: shouldArchive, type: body.type, id: body.id });
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

  if (method === "POST" && parts[1] === "admin" && parts[2] === "sell-requests" && parts[3] && ["schedule", "accept", "reject"].includes(parts[4])) {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const request = (db.sellRequests || []).find(item => item.id === parts[3]);
    if (!request) return sendError(res, 404, "Sell request not found");
    if (["accepted", "rejected"].includes(request.status)) return sendError(res, 400, "Sell request already closed");

    if (parts[4] === "schedule") {
      const pickupNote = String(body.pickupNote || "").trim();
      request.status = "pickup-scheduled";
      request.pickupScheduledAt = new Date().toISOString();
      request.pickupNote = pickupNote || "Pickup has been scheduled. GIVE & TAKE team will contact you soon for pickup timing and verification.";
      request.timeline = [...new Set([...(request.timeline || []), "pickup-scheduled"])];
    }

    if (parts[4] === "reject") {
      request.status = "rejected";
      request.rejectedAt = new Date().toISOString();
      request.reviewNote = String(body.note || "").trim();
      request.timeline = [...new Set([...(request.timeline || []), "rejected"])];
    }

    if (parts[4] === "accept") {
      const finalCoins = Number(body.finalCoins || request.expectedCoins || 0);
      if (!Number.isFinite(finalCoins) || finalCoins < 0) return sendError(res, 400, "Final coin value is invalid");
      const entry = addLedger(db, request.userId, "credit", finalCoins, `Item accepted after warehouse check: ${request.id}`);
      request.status = "accepted";
      request.finalCoins = finalCoins;
      request.acceptedAt = new Date().toISOString();
      request.ledgerId = entry.id;
      request.reviewNote = String(body.note || "").trim();
      request.timeline = [...new Set([...(request.timeline || []), "warehouse-final-check", "coins-credited"])];
    }

    await writeDb(db);
    return sendJson(res, 200, { sellRequest: request, wallet: db.wallets[request.userId] });
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
      imageUrl: String(body.imageUrl || "").trim(),
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

  if (method === "PATCH" && parts[1] === "admin" && parts[2] === "products" && parts[3]) {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const product = db.products.find(item => item.id === parts[3]);
    if (!product) return sendError(res, 404, "Product not found");
    if (typeof body.title === "string" && body.title.trim()) product.title = body.title.trim();
    if (typeof body.category === "string" && body.category.trim()) product.category = body.category.trim();
    if (typeof body.condition === "string" && body.condition.trim()) product.condition = body.condition.trim();
    if (typeof body.imageUrl === "string") product.imageUrl = body.imageUrl.trim();
    if (body.price !== undefined) {
      const price = Number(body.price);
      if (!Number.isFinite(price) || price < 0) return sendError(res, 400, "Product price is invalid");
      product.price = price;
    }
    if (typeof body.status === "string" && ["listed", "unlisted", "sold"].includes(body.status)) product.status = body.status;
    product.updatedAt = new Date().toISOString();
    await writeDb(db);
    return sendJson(res, 200, { product });
  }

  if (method === "DELETE" && parts[1] === "admin" && parts[2] === "products" && parts[3]) {
    if (!requireAdmin(req, res)) return;
    const index = db.products.findIndex(item => item.id === parts[3]);
    if (index === -1) return sendError(res, 404, "Product not found");
    const [product] = db.products.splice(index, 1);
    await writeDb(db);
    return sendJson(res, 200, { product });
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

console.log("Initializing GIVE & TAKE storage...");
ensureDb()
  .then(() => {
    console.log("Storage initialized.");
    server.listen(port, () => {
      console.log(`GIVE & TAKE backend running at http://localhost:${port}`);
      console.log(`Storage mode: ${getStorageInfo().mode}`);
    });
  })
  .catch(error => {
    console.error("Failed to initialize storage:", error);
    process.exit(1);
  });
