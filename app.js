const configuredApiBase = window.GIVE_TAKE_API_BASE || "";
const API_BASE = location.protocol === "file:" ? "http://localhost:4173" : configuredApiBase;
const ADMIN_TOKEN_KEY = "give_take_admin_token";

const fallbackCategories = [
  { id: "mobiles", name: "Mobiles", text: "Phones with IMEI, lock, battery, display, and diagnostic checks." },
  { id: "electronics", name: "Electronics", text: "Laptops, tablets, headphones, speakers, and smart devices." },
  { id: "books", name: "Books", text: "Study books, course sets, exam material, and novels." },
  { id: "furniture", name: "Furniture", text: "Tables, chairs, storage, and useful home furniture." },
  { id: "fashion", name: "Clothes & Shoes", text: "Clean, verified wearable items and accessories." },
  { id: "home", name: "Home & Kitchen", text: "Useful household, kitchen, decor, and appliance items." },
  { id: "bags", name: "Bags", text: "Backpacks, handbags, luggage, and office bags." },
  { id: "toys", name: "Toys & More", text: "Toys, hobby items, bundles, and low-value useful items." },
];

const fallbackProducts = [
  ["p1", "Samsung Galaxy M32", "mobiles", "Lucknow", 8200, "Good", "GIVE & TAKE Verified", 240, 18, ["Tested", "Return Eligible"], ["IMEI matched", "Battery normal", "Minor body marks"], "#bde7ff", "#30586c"],
  ["p2", "iPhone XR 64GB", "mobiles", "Ayodhya", 11800, "Fair", "Refurbished", 380, 21, ["Tested", "Cleaned"], ["Face ID working", "Battery fair", "Local display noted"], "#f5d3cb", "#6b4f64"],
  ["p3", "Redmi Note 11", "mobiles", "Gonda", 6900, "Good", "Collected Item", 210, 15, ["Verified", "Return Eligible"], ["Charger included", "Camera checked", "No screen crack"], "#ffd28c", "#be6b37"],
  ["p4", "Lenovo ThinkPad", "electronics", "Lucknow", 18500, "Good", "GIVE & TAKE Verified", 510, 9, ["Tested", "Cleaned"], ["Keyboard working", "Battery backup checked", "Charger included"], "#c7d2fe", "#243b73"],
  ["p5", "Boat Bluetooth Speaker", "electronics", "Ayodhya", 1450, "Like New", "Open Box", 150, 28, ["Tested"], ["Sound checked", "Charging checked", "Cable included"], "#c9f7e1", "#256b52"],
  ["p6", "Sony Headphones", "electronics", "Gonda", 2200, "Good", "Collected Item", 175, 11, ["Tested", "Cleaned"], ["Mic checked", "Cushions cleaned", "Bluetooth working"], "#f6e7a8", "#4f6f8f"],
  ["p7", "Class 12 PCM Book Set", "books", "Lucknow", 780, "Good", "Collected Item", 98, 8, ["Quality Checked"], ["No missing pages", "Some highlighting", "Latest useful edition"], "#ffe3a3", "#977b35"],
  ["p8", "UPSC Starter Books", "books", "Ayodhya", 1250, "Good", "Collected Item", 310, 22, ["Quality Checked"], ["Set complete", "Clean pages", "Minor notes"], "#d8f1f0", "#3b7270"],
  ["p9", "Engineering Drawing Book", "books", "Gonda", 350, "Fair", "Collected Item", 80, 6, ["Best Value"], ["Usable pages", "Older edition", "Low-cost pick"], "#ead7ff", "#59476f"],
  ["p10", "Study Table", "furniture", "Lucknow", 3100, "Good", "GIVE & TAKE Verified", 165, 5, ["Cleaned"], ["Stable", "Minor scratches", "Pickup checked"], "#d5f0c0", "#607b35"],
  ["p11", "Office Chair", "furniture", "Ayodhya", 2400, "Fair", "Collected Item", 145, 7, ["Cleaned"], ["Wheels working", "Fabric cleaned", "Armrest marks"], "#cde7ff", "#33628c"],
  ["p12", "Small Wooden Shelf", "furniture", "Gonda", 1600, "Good", "Collected Item", 90, 4, ["Cleaned"], ["Strong body", "Polished", "No major crack"], "#f4d6b3", "#8d5930"],
  ["p13", "Denim Jacket", "fashion", "Lucknow", 950, "Like New", "Collected Item", 330, 19, ["Cleaned", "Return Eligible"], ["Size M", "No stains", "Washed"], "#b9d7f5", "#2f4d73"],
  ["p14", "Sports Shoes UK 8", "fashion", "Ayodhya", 1250, "Good", "GIVE & TAKE Verified", 270, 13, ["Cleaned"], ["Sole checked", "No tear", "Minor wear"], "#d7f5c2", "#54783e"],
  ["p15", "Cotton Kurta Set", "fashion", "Gonda", 700, "Good", "Collected Item", 120, 6, ["Cleaned"], ["Size L", "Fresh cleaned", "No defect"], "#ffd7d2", "#9b4d43"],
  ["p16", "Mixer Grinder", "home", "Lucknow", 2600, "Good", "Tested Appliance", 240, 10, ["Tested", "Cleaned"], ["Motor checked", "Jar included", "Safe wiring"], "#ffe4a8", "#a66a22"],
  ["p17", "Table Lamp", "home", "Ayodhya", 650, "Good", "Collected Item", 92, 14, ["Tested"], ["Switch working", "Cable checked", "Bulb included"], "#fff1b8", "#68602a"],
  ["p18", "Kitchen Storage Set", "home", "Gonda", 520, "Like New", "Open Box", 76, 9, ["Cleaned"], ["Set complete", "No cracks", "Hygiene checked"], "#d3f4e9", "#3a6e63"],
  ["p19", "College Backpack", "bags", "Lucknow", 850, "Good", "Collected Item", 220, 18, ["Cleaned"], ["Zips working", "No tear", "Washed"], "#d7e0ff", "#445690"],
  ["p20", "Travel Duffel Bag", "bags", "Ayodhya", 1150, "Good", "Collected Item", 160, 7, ["Cleaned"], ["Handles strong", "Zips checked", "Minor marks"], "#ecd6ba", "#8a603a"],
  ["p21", "Office Laptop Bag", "bags", "Gonda", 700, "Fair", "Collected Item", 105, 5, ["Best Value"], ["Usable", "Zip checked", "Visible wear"], "#cfe7dd", "#446a5a"],
  ["p22", "Kids Toy Bundle", "toys", "Lucknow", 450, "Good", "Low-Value Bundle", 190, 14, ["Cleaned"], ["Pieces checked", "Cleaned", "Bundle value"], "#ffe1ef", "#91536d"],
  ["p23", "Cricket Bat", "toys", "Ayodhya", 900, "Fair", "Collected Item", 125, 8, ["Quality Checked"], ["Usable grip", "Body marks", "No crack"], "#f5dda6", "#7b5d2e"],
  ["p24", "Bluetooth Keyboard", "electronics", "Lucknow", 1250, "Like New", "Open Box", 280, 17, ["Tested"], ["Keys working", "Bluetooth checked", "Battery included"], "#dce9ff", "#425e9a"],
  ["p25", "Single Pillow Pair", "home", "Gonda", 120, "Good", "Donation/Bundle Eligible", 65, 3, ["Cleaned"], ["Low-value item", "Bundle pickup suggested", "Hygiene checked"], "#f2e1c6", "#8f734b"],
].map(([id, title, category, city, price, condition, source, views, sold, badges, checks, artA, artB], index) => ({
  id, title, category, city, price, condition, source, views, sold, badges, checks, artA, artB,
  newest: 25 - index,
}));

let categories = [...fallbackCategories];
let products = [...fallbackProducts];
let wallet = { balance: 2450, ledger: [] };
let orders = [];
let adminDashboard = null;
let partnerTasks = [];
let adminToken = localStorage.getItem(ADMIN_TOKEN_KEY) || "";
let platformConfig = {
  integrations: {
    payments: {
      upi: { merchantName: "GIVE & TAKE", upiId: "", note: "" }
    }
  }
};

const state = {
  route: "home",
  category: null,
  productId: null,
  cart: [],
  query: "",
};

const els = {
  pages: [...document.querySelectorAll(".page")],
  categoryGrid: document.getElementById("categoryGrid"),
  featuredProducts: document.getElementById("featuredProducts"),
  productGrid: document.getElementById("productGrid"),
  categoryProducts: document.getElementById("categoryProducts"),
  categoryTitle: document.getElementById("categoryTitle"),
  productDetail: document.getElementById("productDetail"),
  categoryFilter: document.getElementById("categoryFilter"),
  cityFilter: document.getElementById("cityFilter"),
  sortFilter: document.getElementById("sortFilter"),
  searchInput: document.getElementById("searchInput"),
  sellCategory: document.getElementById("sellCategory"),
  dynamicFields: document.getElementById("dynamicFields"),
  rechargeGrid: document.getElementById("rechargeGrid"),
  ledgerList: document.getElementById("ledgerList"),
  cartView: document.getElementById("cartView"),
  ordersGrid: document.getElementById("ordersGrid"),
  adminGrid: document.getElementById("adminGrid"),
  partnerTasks: document.getElementById("partnerTasks"),
  walletBalance: document.getElementById("walletBalance"),
};

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (options.admin && adminToken) headers.Authorization = `Bearer ${adminToken}`;
  const response = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function loadBackendData() {
  try {
    const [configData, categoryData, productData, walletData, orderData] = await Promise.all([
      api("/api/config"),
      api("/api/categories"),
      api("/api/products?sort=trending"),
      api("/api/wallet/user-demo"),
      api("/api/orders?userId=user-demo"),
    ]);
    categories = categoryData.categories;
    products = productData.products;
    wallet = walletData.wallet;
    orders = orderData.orders;
    platformConfig = configData;
    if (adminToken) await loadProtectedData();
    return true;
  } catch (error) {
    console.warn("Using local fallback data:", error.message);
    return false;
  }
}

async function loadProtectedData() {
  const [adminData, taskData] = await Promise.all([
    api("/api/admin/dashboard", { admin: true }),
    api("/api/partner/tasks", { admin: true }),
  ]);
  adminDashboard = adminData;
  partnerTasks = taskData.tasks;
}

function formatCoins(value) {
  return `${new Intl.NumberFormat("en-IN").format(value)} <span class="coin-symbol" aria-label="coins"></span>`;
}

function coinMarkup() {
  return `<span class="coin-symbol" aria-label="coins"></span>`;
}

function card(product) {
  return `
    <article class="product-card">
      <div class="product-visual" style="--art-a:${product.artA};--art-b:${product.artB}"></div>
      <div class="product-body">
        <div class="badges">
          <span class="badge">${product.source}</span>
          <span class="badge">${product.condition}</span>
        </div>
        <h3>${product.title}</h3>
        <div class="coin-price">${formatCoins(product.price)}</div>
        <p>${product.city} • ${categories.find(c => c.id === product.category).name}</p>
        <div class="card-actions">
          <button class="primary-button" data-product="${product.id}" type="button">View</button>
          <button class="secondary-button" data-add="${product.id}" type="button" title="Add to cart">+</button>
        </div>
      </div>
    </article>
  `;
}

function renderCategories() {
  els.categoryGrid.innerHTML = categories.map((category, index) => `
    <article class="category-card" data-category="${category.id}">
      <div class="category-icon" style="filter:hue-rotate(${index * 26}deg)"></div>
      <div>
        <h3>${category.name}</h3>
        <p>${category.text}</p>
      </div>
    </article>
  `).join("");
}

function renderSelectors() {
  els.categoryFilter.innerHTML = `<option value="all">All categories</option>` + categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
  els.sellCategory.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function getFilteredProducts() {
  const category = els.categoryFilter?.value || "all";
  const city = els.cityFilter?.value || "all";
  const sort = els.sortFilter?.value || "trending";
  const query = state.query.toLowerCase();
  let list = [...products].filter(product => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesCity = city === "all" || product.city === city;
    const matchesQuery = !query || `${product.title} ${product.city} ${product.source}`.toLowerCase().includes(query);
    return matchesCategory && matchesCity && matchesQuery;
  });

  const sorters = {
    trending: (a, b) => (b.views + b.sold * 12) - (a.views + a.sold * 12),
    newest: (a, b) => b.newest - a.newest,
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    views: (a, b) => b.views - a.views,
    purchased: (a, b) => b.sold - a.sold,
  };
  return list.sort(sorters[sort]);
}

function renderProducts() {
  els.featuredProducts.innerHTML = products.slice(0, 8).map(card).join("");
  els.productGrid.innerHTML = getFilteredProducts().map(card).join("");
  if (state.category) {
    const category = categories.find(item => item.id === state.category);
    els.categoryTitle.textContent = category.name;
    els.categoryProducts.innerHTML = products.filter(product => product.category === state.category).map(card).join("");
  }
}

function renderProductDetail() {
  const product = products.find(item => item.id === state.productId) || products[0];
  els.productDetail.innerHTML = `
    <div class="detail-image" style="--art-a:${product.artA};--art-b:${product.artB}"></div>
    <article class="detail-panel">
      <div class="badges">
        <span class="badge">${product.source}</span>
        <span class="badge">${product.condition}</span>
        ${product.badges.map(badge => `<span class="badge">${badge}</span>`).join("")}
      </div>
      <h1>${product.title}</h1>
      <div class="coin-price">${formatCoins(product.price)}</div>
      <p>${product.city} • Product price is coin-only. Delivery charge can be paid by coins online or cash on delivery.</p>
      <div class="checklist">
        ${product.checks.map(check => `<span>${check}</span>`).join("")}
        <span>Return window: 24-48 hours only if not as described.</span>
      </div>
      <button class="primary-button full" data-add="${product.id}" type="button">Add to Cart</button>
    </article>
  `;
}

function renderFormFields() {
  const category = els.sellCategory.value;
  const fieldMap = {
    mobiles: ["Brand and model", "Storage/RAM", "IMEI available?", "Bill/warranty", "Battery/display issues"],
    electronics: ["Brand/model/serial", "Power and charging status", "Accessories included", "Known defects"],
    books: ["Class/course/subject", "Edition/year", "Pages missing?", "Writing/highlighting condition"],
    furniture: ["Material", "Dimensions", "Lift/floor pickup details", "Cracks/scratches"],
    fashion: ["Size", "Brand", "Cleanliness", "Stains/tears"],
    home: ["Brand if any", "Working condition", "Missing parts", "Hygiene/safety condition"],
    bags: ["Size/type", "Zip/handle condition", "Tears or stains", "Brand if any"],
    toys: ["Age group", "Set completeness", "Missing pieces", "Cleanliness"],
  };
  els.dynamicFields.innerHTML = (fieldMap[category] || []).map(field => `
    <label>${field}<input placeholder="${field}" /></label>
  `).join("");
}

function renderWallet() {
  const upi = platformConfig.integrations?.payments?.upi || {};
  document.getElementById("walletUpiNotice")?.remove();
  els.rechargeGrid.innerHTML = [50, 100, 150, 200, 250, 500, 1000, 2000, 5000].map(amount => `
    <button type="button" data-recharge="${amount}">${amount} <span class="coin-symbol" aria-label="coins"></span></button>
  `).join("");
  els.rechargeGrid.insertAdjacentHTML("beforebegin", `
    <div class="notice" id="walletUpiNotice">
      Pay by UPI only${upi.upiId ? ` to <strong>${upi.upiId}</strong>` : ". Admin must add UPI ID before public recharge."}
      Coins are credited after admin verifies payment.
    </div>
  `);
  els.walletBalance.textContent = new Intl.NumberFormat("en-IN").format(wallet.balance || 0);
  const walletHeading = document.querySelector("#page-wallet .page-title h1");
  if (walletHeading) walletHeading.innerHTML = `${new Intl.NumberFormat("en-IN").format(wallet.balance || 0)} <span class="coin-symbol large" aria-label="coins"></span> available.`;
  const ledger = wallet.ledger?.length ? wallet.ledger : [
    { type: "credit", amount: 1200, reason: "Item accepted after warehouse check" },
    { type: "debit", amount: 650, reason: "Product purchase" },
    { type: "credit", amount: 500, reason: "UPI coin recharge" },
    { type: "debit", amount: 50, reason: "Delivery paid in coins" },
    { type: "credit", amount: 5, reason: "Referral reward" },
  ];
  els.ledgerList.innerHTML = ledger.map(entry => {
    const sign = entry.type === "debit" ? "-" : "+";
    return `<div class="ledger-item"><strong>${sign}${new Intl.NumberFormat("en-IN").format(entry.amount)}</strong><span>${entry.reason}</span></div>`;
  }).join("");
}

function renderOrders() {
  const fallbackOrders = [
    { id: "GT-1042", status: "coins-confirmed", timeline: ["order-placed", "coins-confirmed"] },
    { id: "GT-P221", status: "warehouse-final-check", timeline: ["collected", "received", "check"] },
  ];
  const list = orders.length ? orders : fallbackOrders;
  els.ordersGrid.innerHTML = list.map(order => `
    <article class="order-card">
      <strong>${order.id}</strong>
      <span>${String(order.status || "").replaceAll("-", " ")}</span>
      <div class="mini-steps">
        ${(order.timeline || []).slice(0, 4).map(step => `<span>${String(step).replaceAll("-", " ")}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderAdmin() {
  if (!adminToken) {
    els.adminGrid.innerHTML = `
      <article class="wide-card">
        <strong>Admin Login</strong>
        <span>This section is private. Enter the admin password to continue.</span>
        <form class="inline-form" id="adminLoginForm">
          <input name="password" type="password" placeholder="Admin password" />
          <button class="primary-button" type="submit">Login</button>
        </form>
      </article>
    `;
    return;
  }
  if (!adminDashboard) {
    els.adminGrid.innerHTML = `<article class="wide-card"><strong>Admin</strong><span>Loading private admin data...</span></article>`;
    return;
  }
  const counts = adminDashboard.counts;
  const upi = adminDashboard.integrations.payments.upi || {};
  const pendingRecharges = (adminDashboard.rechargeRequests || []).filter(item => item.status === "pending-admin-verification");
  els.adminGrid.innerHTML = `
    <article><strong>Product Review</strong><span>${counts.sellRequests} sell requests in system</span></article>
    <article><strong>Inventory</strong><span>${counts.listedProducts} listed of ${counts.products} products</span></article>
    <article><strong>Orders</strong><span>${counts.orders} order records</span></article>
    <article><strong>Returns</strong><span>${counts.returns} return requests</span></article>
    <article><strong>Maintenance Mode</strong><span>Full ${adminDashboard.maintenance.full ? "on" : "off"} • paused: ${adminDashboard.maintenance.pausedFeatures.length || 0}</span></article>
    <article><strong>Integrations</strong><span>UPI-only payment • external delivery apps disabled</span></article>
    <article class="wide-card">
      <strong>UPI Settings</strong>
      <form class="inline-form" id="upiSettingsForm">
        <input name="merchantName" value="${upi.merchantName || "GIVE & TAKE"}" placeholder="Merchant name" />
        <input name="upiId" value="${upi.upiId || ""}" placeholder="yourupi@bank" />
        <input name="note" value="${upi.note || ""}" placeholder="Admin note" />
        <button class="primary-button" type="submit">Save UPI</button>
      </form>
    </article>
    <article class="wide-card">
      <strong>Pending UPI Recharges</strong>
      <span>${pendingRecharges.length ? "Verify payment in your UPI account before approving." : "No pending recharge requests."}</span>
      <div class="admin-list">
        ${pendingRecharges.map(item => `
          <div class="admin-row">
            <span>${item.id} • ${item.amount} ${coinMarkup()} • Ref: ${item.upiReference || "not entered"}</span>
            <button class="secondary-button" data-approve-recharge="${item.id}" type="button">Approve</button>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderPartnerTasks() {
  if (!adminToken) {
    els.partnerTasks.innerHTML = `
      <article class="task-card">
        <strong>Partner Login Required</strong>
        <span>Use admin login first, then open this panel again.</span>
      </article>
    `;
    return;
  }
  if (!partnerTasks.length) {
    els.partnerTasks.innerHTML = `
      <article class="task-card">
        <strong>No tasks</strong>
        <span>No partner tasks assigned right now.</span>
      </article>
    `;
    return;
  }
  els.partnerTasks.innerHTML = partnerTasks.map(task => `
    <article class="task-card">
      <strong>${task.id}</strong>
      <span>${task.type.replaceAll("-", " ")} • ${task.city} • ${task.status}</span>
      <ul>${task.checklist.map(item => `<li>${item}</li>`).join("")}</ul>
      <button class="secondary-button full" data-task-complete="${task.id}" type="button">Mark Checked</button>
    </article>
  `).join("");
}

function renderCart() {
  if (!state.cart.length) {
    els.cartView.innerHTML = `<p>Your cart is empty. Product is reserved only during checkout for a short time.</p><a class="primary-button" href="#market">Browse Products</a>`;
    return;
  }
  const items = state.cart.map(id => products.find(product => product.id === id));
  const total = items.reduce((sum, product) => sum + product.price, 0);
  els.cartView.innerHTML = `
    ${items.map(product => `<p><strong>${product.title}</strong> • ${formatCoins(product.price)}</p>`).join("")}
    <hr />
    <h2>Total: ${formatCoins(total)}</h2>
    <p>Checkout happens with coins only. If wallet is short, recharge the next multiple of 50 coins.</p>
    <label>Delivery city
      <select id="checkoutCity">
        <option>Lucknow</option>
        <option>Ayodhya</option>
        <option>Gonda</option>
      </select>
    </label>
    <button class="primary-button" data-checkout type="button">Proceed to Coin Checkout</button>
  `;
}

function navigate(rawHash) {
  const hash = (rawHash || location.hash || "#home").replace("#", "");
  const [route, value] = hash.split("/");
  state.route = route || "home";
  if (route === "category") state.category = value || "mobiles";
  if (route === "product") state.productId = value || products[0].id;

  els.pages.forEach(page => page.classList.toggle("active", page.dataset.page === state.route));
  if (!document.querySelector(`.page[data-page="${state.route}"]`)) {
    state.route = "home";
    els.pages.forEach(page => page.classList.toggle("active", page.dataset.page === "home"));
  }
  renderProducts();
  renderProductDetail();
  renderCart();
  renderOrders();
  renderAdmin();
  renderPartnerTasks();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function wireEvents() {
  document.body.addEventListener("click", async event => {
    const category = event.target.closest("[data-category]");
    if (category) location.hash = `category/${category.dataset.category}`;

    const product = event.target.closest("[data-product]");
    if (product) location.hash = `product/${product.dataset.product}`;

    const add = event.target.closest("[data-add]");
    if (add) {
      if (!state.cart.includes(add.dataset.add)) state.cart.push(add.dataset.add);
      location.hash = "cart";
    }

    const route = event.target.closest("[data-route]");
    if (route) location.hash = route.dataset.route;

    const recharge = event.target.closest("[data-recharge]");
    if (recharge) {
      try {
        const upi = platformConfig.integrations?.payments?.upi || {};
        if (!upi.upiId) {
          alert("Admin UPI ID is not configured yet. Add it from the Admin page first.");
          return;
        }
        const upiReference = prompt(`Pay ${recharge.dataset.recharge} coins amount by UPI to ${upi.upiId}, then enter UPI reference/transaction ID.`);
        if (!upiReference) return;
        const data = await api("/api/wallet/recharge", {
          method: "POST",
          body: JSON.stringify({ userId: "user-demo", amount: Number(recharge.dataset.recharge), method: "UPI", upiReference }),
        });
        wallet = data.wallet;
        renderWallet();
        alert(`Recharge request submitted: ${data.rechargeRequest.id}. Coins will be credited after admin verifies payment.`);
      } catch (error) {
        alert(error.message);
      }
    }

    const checkout = event.target.closest("[data-checkout]");
    if (checkout) {
      try {
        const city = document.getElementById("checkoutCity")?.value || "Lucknow";
        const data = await api("/api/orders", {
          method: "POST",
          body: JSON.stringify({ userId: "user-demo", productIds: state.cart, city, deliveryChargeMode: "cod-rupees" }),
        });
        wallet = data.wallet;
        orders.unshift(data.order);
        state.cart = [];
        renderWallet();
        renderProducts();
        renderCart();
        renderOrders();
        location.hash = "orders";
      } catch (error) {
        alert(error.message);
      }
    }

    const taskComplete = event.target.closest("[data-task-complete]");
    if (taskComplete) {
      try {
        const data = await api(`/api/partner/tasks/${taskComplete.dataset.taskComplete}`, {
          method: "PATCH",
          admin: true,
          body: JSON.stringify({ status: "doorstep-checked", proof: { checklist: "completed in partner panel" } }),
        });
        partnerTasks = partnerTasks.map(task => task.id === data.task.id ? data.task : task);
        renderPartnerTasks();
      } catch (error) {
        alert(error.message);
      }
    }

    const approveRecharge = event.target.closest("[data-approve-recharge]");
    if (approveRecharge) {
      try {
        const data = await api(`/api/admin/recharges/${approveRecharge.dataset.approveRecharge}/approve`, {
          method: "POST",
          admin: true,
          body: JSON.stringify({}),
        });
        wallet = data.wallet;
        const adminData = await api("/api/admin/dashboard", { admin: true });
        adminDashboard = adminData;
        renderWallet();
        renderAdmin();
        alert(`Approved ${data.rechargeRequest.amount} coins for ${data.rechargeRequest.userId}.`);
      } catch (error) {
        alert(error.message);
      }
    }
  });

  window.addEventListener("hashchange", () => navigate());
  [els.categoryFilter, els.cityFilter, els.sortFilter].forEach(el => el.addEventListener("change", renderProducts));
  els.searchInput.addEventListener("input", event => {
    state.query = event.target.value;
    if (state.route !== "market") location.hash = "market";
    renderProducts();
  });
  els.sellCategory.addEventListener("change", renderFormFields);
  document.getElementById("sellForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const data = await api("/api/sell-requests", {
        method: "POST",
        body: JSON.stringify({
          userId: "user-demo",
          city: form.get("city"),
          category: els.sellCategory.value,
          title: form.get("title"),
          expectedCoins: Number(form.get("expectedCoins") || 0),
          condition: form.get("condition"),
          details: { note: form.get("details") },
        }),
      });
      alert(`Upload submitted for review. Request ID: ${data.sellRequest.id}`);
      event.currentTarget.reset();
      renderFormFields();
    } catch (error) {
      alert(error.message);
    }
  });
  document.getElementById("joinForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const data = await api("/api/join-applications", {
        method: "POST",
        body: JSON.stringify({
          role: form.get("role"),
          city: form.get("city"),
          name: form.get("name"),
          phone: form.get("phone"),
          experience: form.get("experience"),
        }),
      });
      alert(`Application submitted. Application ID: ${data.application.id}`);
      event.currentTarget.reset();
    } catch (error) {
      alert(error.message);
    }
  });
  document.body.addEventListener("submit", async event => {
    if (event.target.id === "adminLoginForm") {
      event.preventDefault();
      const form = new FormData(event.target);
      try {
        const data = await api("/api/admin/login", {
          method: "POST",
          body: JSON.stringify({ password: form.get("password") }),
        });
        adminToken = data.token;
        localStorage.setItem(ADMIN_TOKEN_KEY, adminToken);
        await loadProtectedData();
        renderAdmin();
        renderPartnerTasks();
        alert("Admin login successful.");
      } catch (error) {
        alert(error.message);
      }
      return;
    }
    if (event.target.id !== "upiSettingsForm") return;
    event.preventDefault();
    const form = new FormData(event.target);
    try {
      const data = await api("/api/admin/payments/upi", {
        method: "PATCH",
        admin: true,
        body: JSON.stringify({
          merchantName: form.get("merchantName"),
          upiId: form.get("upiId"),
          note: form.get("note"),
        }),
      });
      platformConfig.integrations.payments.upi = data.upi;
      const adminData = await api("/api/admin/dashboard", { admin: true });
      adminDashboard = adminData;
      renderWallet();
      renderAdmin();
      alert("UPI details saved.");
    } catch (error) {
      alert(error.message);
    }
  });
  document.getElementById("langToggle").addEventListener("click", () => {
    alert("English is active for Phase 1. Hindi support can be connected in the next build pass.");
  });
}

async function init() {
  await loadBackendData();
  renderSelectors();
  renderCategories();
  renderProducts();
  renderFormFields();
  renderWallet();
  renderOrders();
  renderAdmin();
  renderPartnerTasks();
  wireEvents();
  navigate();
}

init();
