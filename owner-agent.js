const ADMIN_TOKEN_KEY = "give_take_admin_token";
const configuredApiBase = window.GIVE_TAKE_API_BASE || "";
const API_BASE = location.protocol === "file:" ? "http://localhost:4173" : configuredApiBase;

let adminToken = localStorage.getItem(ADMIN_TOKEN_KEY) || "";
let categories = [];
let products = [];
let currentDraft = null;
let currentPrice = null;

const els = {
  status: document.getElementById("agentStatus"),
  lockView: document.getElementById("lockView"),
  workspace: document.getElementById("workspaceView"),
  loginForm: document.getElementById("ownerLoginForm"),
  listingForm: document.getElementById("listingAgentForm"),
  categorySelect: document.getElementById("ownerCategorySelect"),
  catalogCount: document.getElementById("catalogCount"),
  refreshButton: document.getElementById("refreshDataButton"),
  priceSelectorEmpty: document.getElementById("priceSelectorEmpty"),
  priceSelector: document.getElementById("priceSelector"),
  priceRange: document.getElementById("priceRange"),
  selectedPrice: document.getElementById("selectedPrice"),
  priceReason: document.getElementById("priceReason"),
  priceMetrics: document.getElementById("priceMetrics"),
  dealStatus: document.getElementById("dealStatus"),
  draftOutput: document.getElementById("draftOutput"),
  duplicateOutput: document.getElementById("duplicateOutput"),
  duplicateStatus: document.getElementById("duplicateStatus"),
  badgeOutput: document.getElementById("badgeOutput"),
  copyDraftButton: document.getElementById("copyDraftButton"),
  askForm: document.getElementById("askAgentForm"),
  agentAnswer: document.getElementById("agentAnswer")
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function safeImageUrl(value) {
  const rawUrl = String(value || "").trim();
  if (!rawUrl) return "";
  if (/^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=]+$/i.test(rawUrl)) return rawUrl;
  try {
    const parsed = new URL(rawUrl, window.location.origin);
    if (["http:", "https:"].includes(parsed.protocol)) return parsed.href;
  } catch {
    return "";
  }
  return "";
}

async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (options.admin && adminToken) headers.Authorization = `Bearer ${adminToken}`;
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

function titleCase(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, char => char.toUpperCase());
}

function normalizeWords(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(word => word.length > 2 && !["with", "for", "and", "the", "new", "pcs", "piece", "pack", "set"].includes(word));
}

function similarity(a, b) {
  const first = new Set(normalizeWords(a));
  const second = new Set(normalizeWords(b));
  if (!first.size || !second.size) return 0;
  const intersection = [...first].filter(word => second.has(word)).length;
  const union = new Set([...first, ...second]).size;
  return intersection / union;
}

function roundToStep(value, step = 5) {
  return Math.max(step, Math.round(Number(value || 0) / step) * step);
}

function median(values) {
  const list = values.filter(value => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
  if (!list.length) return 0;
  const mid = Math.floor(list.length / 2);
  return list.length % 2 ? list[mid] : Math.round((list[mid - 1] + list[mid]) / 2);
}

function getFormInput() {
  const form = new FormData(els.listingForm);
  return {
    title: String(form.get("title") || "").trim(),
    url: String(form.get("url") || "").trim(),
    category: String(form.get("category") || "auto"),
    condition: String(form.get("condition") || "Good").trim(),
    supplierCost: Number(form.get("supplierCost") || 0),
    marketPrice: Number(form.get("marketPrice") || 0),
    imageUrl: String(form.get("imageUrl") || "").trim(),
    city: String(form.get("city") || "Lucknow").trim(),
    details: String(form.get("details") || "").trim()
  };
}

function inferCategory(input) {
  if (input.category && input.category !== "auto") return input.category;
  const text = `${input.title} ${input.details} ${input.url}`.toLowerCase();
  const rules = [
    ["mobiles", ["mobile", "phone", "iphone", "android", "samsung", "redmi", "oppo", "vivo"]],
    ["electronics", ["charger", "earbud", "bluetooth", "speaker", "usb", "cable", "powerbank", "keyboard", "mouse", "watch"]],
    ["books", ["book", "novel", "exam", "course", "ncert", "notes", "study"]],
    ["fashion", ["shirt", "shoe", "kurta", "jeans", "dress", "watch", "belt"]],
    ["bags", ["bag", "backpack", "luggage", "purse", "handbag"]],
    ["toys", ["toy", "game", "kids", "puzzle", "remote car"]],
    ["home", ["kitchen", "bottle", "holder", "cap", "lamp", "cleaner", "mop", "storage", "wall", "home", "chair", "table", "sofa", "rack", "almirah", "desk"]]
  ];
  const match = rules.find(([, keywords]) => keywords.some(keyword => text.includes(keyword)));
  return match ? match[0] : "home";
}

function categoryName(id) {
  return categories.find(category => category.id === id)?.name || titleCase(id);
}

function findSimilarProducts(input, category) {
  const title = `${input.title} ${input.details}`;
  return products
    .map(product => {
      const titleScore = similarity(title, product.title);
      const categoryBonus = product.category === category ? 0.12 : 0;
      const sourceBonus = input.url && product.supplierUrl && input.url === product.supplierUrl ? 0.35 : 0;
      const score = Math.min(1, titleScore + categoryBonus + sourceBonus);
      return { ...product, score };
    })
    .filter(product => product.score >= 0.22)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function categoryStats(category) {
  const scoped = products.filter(product => product.category === category && Number(product.price) > 0);
  const listed = scoped.filter(product => product.status === "listed");
  const prices = (listed.length ? listed : scoped).map(product => Number(product.price || 0));
  return {
    count: prices.length,
    median: median(prices),
    low: prices.length ? Math.min(...prices) : 0,
    high: prices.length ? Math.max(...prices) : 0
  };
}

function priceRecommendation(input, category, similar) {
  const stats = categoryStats(category);
  const similarPrices = similar.map(product => Number(product.price || 0)).filter(price => price > 0);
  const similarMedian = median(similarPrices);
  const conditionFactor = {
    "New": 1,
    "Like New": 0.88,
    "Good": 0.74,
    "Fair": 0.58,
    "Used": 0.48
  }[input.condition] || 0.74;
  const cost = Number.isFinite(input.supplierCost) ? input.supplierCost : 0;
  const market = Number.isFinite(input.marketPrice) ? input.marketPrice : 0;
  const costBased = cost > 0 ? cost * (input.condition === "New" ? 1.22 : 1.12) : 0;
  const marketBased = market > 0 ? market * (0.68 * conditionFactor) : 0;
  const categoryBased = stats.median || 80;
  const similarBased = similarMedian || 0;
  const signals = [
    { value: costBased, weight: cost > 0 ? 3 : 0 },
    { value: marketBased, weight: market > 0 ? 2 : 0 },
    { value: similarBased, weight: similarBased ? 3 : 0 },
    { value: categoryBased, weight: 1 }
  ].filter(item => item.value > 0 && item.weight > 0);
  const weighted = signals.reduce((sum, item) => sum + item.value * item.weight, 0) / signals.reduce((sum, item) => sum + item.weight, 0);
  let balanced = roundToStep(weighted || 80, 5);
  if (cost > 0) balanced = Math.max(roundToStep(cost * 1.08, 5), balanced);
  if (market > 0) balanced = Math.min(balanced, roundToStep(market * 0.82, 5));
  const fast = roundToStep(balanced * 0.84, 5);
  const profit = roundToStep(balanced * 1.16, 5);
  const min = Math.max(10, roundToStep(Math.min(fast, balanced) * 0.88, 5));
  const max = Math.max(profit, roundToStep(balanced * 1.28, 5), 30);
  return {
    fast,
    balanced,
    profit,
    min,
    max,
    stats,
    similarMedian,
    cost,
    market,
    conditionFactor
  };
}

function customerFeel(price, info) {
  if (info.market > 0) {
    const ratio = price / info.market;
    if (ratio <= 0.52) return "Strong deal for user";
    if (ratio <= 0.68) return "Good rate, easy to trust";
    if (ratio <= 0.82) return "Acceptable but watch conversion";
    return "Looks close to market price";
  }
  if (info.similarMedian > 0) {
    const ratio = price / info.similarMedian;
    if (ratio <= 0.9) return "Better than similar listings";
    if (ratio <= 1.1) return "Matches current catalog";
    return "Higher than similar listings";
  }
  return "Balanced for first listing";
}

function marginText(price, info) {
  if (!info.cost) return "No supplier cost";
  const margin = price - info.cost;
  const percent = Math.round((margin / info.cost) * 100);
  return `${margin >= 0 ? "+" : ""}${margin} coins (${percent}%)`;
}

function dealMode(price, info) {
  if (price <= info.fast) return "fast";
  if (price >= info.profit) return "profit";
  return "balanced";
}

function buildBadges(input, price, priceInfo, duplicateRisk) {
  const badges = ["G&T Verified"];
  if (input.url.includes("deodap")) badges.push("DeoDap Product");
  if (input.condition === "New") badges.push("New Drop");
  if (customerFeel(price, priceInfo).toLowerCase().includes("good") || customerFeel(price, priceInfo).toLowerCase().includes("strong")) {
    badges.push("Good Coin Rate");
  }
  if (dealMode(price, priceInfo) === "fast") badges.push("Fast Sale Pick");
  if (duplicateRisk < 0.6) badges.push("Low Duplicate Risk");
  return [...new Set(badges)].slice(0, 5);
}

function buildChecks(input, priceInfo, duplicateRisk) {
  return [
    input.imageUrl ? "Image verified" : "Image needed before publishing",
    priceInfo.stats.count ? "Checked against category prices" : "Category has low comparison data",
    duplicateRisk >= 0.72 ? "Duplicate needs review" : "Duplicate scan clear enough",
    "GIVE & TAKE badge style matched",
    "Admin can edit before publishing"
  ];
}

function buildDraft(input, selectedPrice) {
  const category = inferCategory(input);
  const similar = findSimilarProducts(input, category);
  const priceInfo = priceRecommendation(input, category, similar);
  const price = selectedPrice || priceInfo.balanced;
  const duplicateRisk = similar[0]?.score || 0;
  const badges = buildBadges(input, price, priceInfo, duplicateRisk);
  const checks = buildChecks(input, priceInfo, duplicateRisk);
  const title = titleCase(input.title).slice(0, 110);
  const description = [
    input.details || `${title} listed for GIVE & TAKE customers.`,
    `${price} G&T coins keeps it ${customerFeel(price, priceInfo).toLowerCase()}.`
  ].join(" ").slice(0, 260);
  const payload = {
    title,
    category,
    city: input.city,
    price,
    condition: input.condition,
    source: "GIVE & TAKE Verified",
    badges,
    checks,
    imageUrl: input.imageUrl,
    artA: "#d3f4e9",
    artB: "#3a6e63",
    quantity: 1
  };
  return {
    title,
    category,
    categoryName: categoryName(category),
    price,
    condition: input.condition,
    city: input.city,
    sourceUrl: input.url,
    imageUrl: input.imageUrl,
    description,
    badges,
    checks,
    similar,
    duplicateRisk,
    priceInfo,
    payload
  };
}

function renderPriceSelector(draft) {
  currentPrice = draft.price;
  const info = draft.priceInfo;
  els.priceSelectorEmpty.classList.add("is-hidden");
  els.priceSelector.classList.remove("is-hidden");
  els.priceRange.min = info.min;
  els.priceRange.max = info.max;
  els.priceRange.step = 5;
  els.priceRange.value = currentPrice;
  updatePriceView(draft);
}

function updatePriceView(draft) {
  currentPrice = Number(els.priceRange.value || draft.price);
  const info = draft.priceInfo;
  const mode = dealMode(currentPrice, info);
  els.selectedPrice.textContent = `${currentPrice} G&T`;
  els.priceReason.textContent = customerFeel(currentPrice, info);
  els.dealStatus.textContent = mode === "fast" ? "Fast sale price" : mode === "profit" ? "Better margin price" : "Balanced price";
  document.querySelectorAll("[data-price-mode]").forEach(button => {
    button.classList.toggle("active", button.dataset.priceMode === mode);
  });
  els.priceMetrics.innerHTML = [
    ["Fast sale", `${info.fast} G&T`],
    ["Balanced", `${info.balanced} G&T`],
    ["Better margin", `${info.profit} G&T`],
    ["Category median", info.stats.median ? `${info.stats.median} G&T` : "No data"],
    ["Similar median", info.similarMedian ? `${info.similarMedian} G&T` : "No close match"],
    ["Margin", marginText(currentPrice, info)]
  ].map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
}

function renderDraft(draft) {
  const imageUrl = safeImageUrl(draft.imageUrl);
  const image = imageUrl
    ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(draft.title)}" />`
    : `<span class="brand-mark">G&T</span>`;
  els.draftOutput.innerHTML = `
    <div class="draft-grid">
      <article class="preview-card">
        <div class="preview-media">${image}</div>
        <div class="preview-body">
          <div class="badge-list">${draft.badges.slice(0, 2).map((badge, index) => `<span class="badge-pill ${index ? "gold" : ""}">${escapeHtml(badge)}</span>`).join("")}</div>
          <h3>${escapeHtml(draft.title)}</h3>
          <div class="coin-price">${draft.price} G&T</div>
          <small>${escapeHtml(draft.categoryName)} • ${escapeHtml(draft.condition)}</small>
        </div>
      </article>
      <div class="draft-fields">
        ${[
          ["Title", draft.title],
          ["Category", draft.categoryName],
          ["Coin price", `${draft.price} G&T`],
          ["Customer feel", customerFeel(draft.price, draft.priceInfo)],
          ["Description", draft.description]
        ].map(([label, value]) => `<div class="draft-row"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
        <div class="draft-actions">
          <button class="primary-button" id="createProductButton" type="button">Create Product</button>
          <button class="secondary-button" id="copyPayloadButton" type="button">Copy Admin Payload</button>
        </div>
      </div>
    </div>
  `;
  els.copyDraftButton.disabled = false;
}

function renderDuplicates(draft) {
  if (!draft.similar.length) {
    els.duplicateStatus.textContent = "No duplicate found";
    els.duplicateOutput.innerHTML = `<div class="empty-state">No close matching product found in current catalog.</div>`;
    return;
  }
  const highRisk = draft.duplicateRisk >= 0.72;
  els.duplicateStatus.textContent = highRisk ? "Review before publish" : "Low to medium risk";
  els.duplicateOutput.innerHTML = `
    <div class="duplicate-list">
      ${draft.similar.map(product => `
        <div class="duplicate-item ${product.score >= 0.72 ? "high" : ""}">
          <span>${Number.isFinite(Number(product.score)) ? Math.round(Number(product.score) * 100) : 0}% similar • ${escapeHtml(product.category || "")} • ${Number(product.price || 0) || 0} G&T</span>
          <strong>${escapeHtml(product.title || "Product")}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderBadges(draft) {
  els.badgeOutput.innerHTML = `
    <div class="badge-list">
      ${draft.badges.map((badge, index) => `<span class="badge-pill ${index % 3 === 1 ? "gold" : index % 3 === 2 ? "blue" : ""}">${escapeHtml(badge)}</span>`).join("")}
    </div>
    <div class="check-list">
      ${draft.checks.map(check => `<span>${escapeHtml(check)}</span>`).join("")}
    </div>
  `;
}

function generateDraft() {
  const input = getFormInput();
  if (!input.title) return;
  const baseDraft = buildDraft(input, currentPrice);
  currentDraft = baseDraft;
  renderPriceSelector(currentDraft);
  renderDraft(currentDraft);
  renderDuplicates(currentDraft);
  renderBadges(currentDraft);
}

function regenerateWithPrice(price) {
  if (!currentDraft) return;
  const input = getFormInput();
  currentDraft = buildDraft(input, price);
  els.priceRange.value = currentDraft.price;
  updatePriceView(currentDraft);
  renderDraft(currentDraft);
  renderBadges(currentDraft);
}

function populateCategories() {
  const options = [
    `<option value="auto">Auto detect</option>`,
    ...categories.map(category => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`)
  ];
  els.categorySelect.innerHTML = options.join("");
}

async function loadOwnerData() {
  els.status.textContent = "Loading private data";
  const [categoryData, dashboard] = await Promise.all([
    api("/api/categories"),
    api("/api/admin/dashboard?summary=1", { admin: true })
  ]);
  categories = categoryData.categories || [];
  products = dashboard.products || [];
  populateCategories();
  els.catalogCount.textContent = `${products.length} products loaded`;
  els.status.textContent = "Private agent active";
  els.lockView.classList.add("is-hidden");
  els.workspace.classList.remove("is-hidden");
}

function showLocked(message) {
  els.lockView.classList.remove("is-hidden");
  els.workspace.classList.add("is-hidden");
  els.status.textContent = message || "Private link";
}

async function copyText(value) {
  await navigator.clipboard.writeText(value);
}

function answerPrompt(prompt) {
  if (!currentDraft) return "Pehle product details daal ke draft generate karo. Uske baad main price, duplicate aur badges clearly bata paunga.";
  const text = String(prompt || "").toLowerCase();
  const pieces = [];
  if (text.includes("price") || text.includes("rate") || text.includes("coin")) {
    pieces.push(`Recommended price ${currentDraft.price} G&T hai. ${customerFeel(currentDraft.price, currentDraft.priceInfo)}. Fast sale ke liye ${currentDraft.priceInfo.fast} G&T, margin ke liye ${currentDraft.priceInfo.profit} G&T rakh sakte ho.`);
  }
  if (text.includes("duplicate") || text.includes("same")) {
    pieces.push(currentDraft.duplicateRisk >= 0.72
      ? "Duplicate risk high hai. Publish se pehle similar product ko delete/unlist ya title-price differentiate karo."
      : "Duplicate risk manageable hai. Similar products hain, lekin exact duplicate nahi lag raha.");
  }
  if (text.includes("badge") || text.includes("design")) {
    pieces.push(`Badges: ${currentDraft.badges.join(", ")}. Ye GIVE & TAKE style ke green/gold verified look ke saath fit honge.`);
  }
  if (!pieces.length) {
    pieces.push(`${currentDraft.title} ke liye category ${currentDraft.categoryName}, price ${currentDraft.price} G&T, aur badge set ready hai. Publish se pehle image aur duplicate list ek baar check kar lena.`);
  }
  return pieces.join(" ");
}

els.loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  const button = event.submitter;
  button.disabled = true;
  button.textContent = "Unlocking...";
  try {
    const data = await api("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: new FormData(event.target).get("password") })
    });
    adminToken = data.token;
    localStorage.setItem(ADMIN_TOKEN_KEY, adminToken);
    await loadOwnerData();
  } catch (error) {
    els.status.textContent = error.message;
  } finally {
    button.disabled = false;
    button.textContent = "Unlock Agent";
  }
});

els.refreshButton.addEventListener("click", async () => {
  els.refreshButton.disabled = true;
  els.refreshButton.textContent = "Refreshing...";
  try {
    await loadOwnerData();
    if (currentDraft) generateDraft();
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      adminToken = "";
      showLocked("Login expired");
    } else {
      els.status.textContent = error.message;
    }
  } finally {
    els.refreshButton.disabled = false;
    els.refreshButton.textContent = "Refresh Data";
  }
});

els.listingForm.addEventListener("submit", event => {
  event.preventDefault();
  currentPrice = null;
  generateDraft();
});

els.priceRange.addEventListener("input", () => {
  if (!currentDraft) return;
  updatePriceView(currentDraft);
});

els.priceRange.addEventListener("change", () => {
  regenerateWithPrice(Number(els.priceRange.value));
});

document.addEventListener("click", async event => {
  const priceButton = event.target.closest("[data-price-mode]");
  if (priceButton && currentDraft) {
    const value = currentDraft.priceInfo[priceButton.dataset.priceMode];
    regenerateWithPrice(value);
    return;
  }

  if (event.target.id === "copyDraftButton" && currentDraft) {
    await copyText(`${currentDraft.title}\n${currentDraft.price} G&T\n${currentDraft.description}\nBadges: ${currentDraft.badges.join(", ")}`);
    event.target.textContent = "Copied";
    setTimeout(() => { event.target.textContent = "Copy Draft"; }, 1200);
    return;
  }

  if (event.target.id === "copyPayloadButton" && currentDraft) {
    await copyText(JSON.stringify(currentDraft.payload, null, 2));
    event.target.textContent = "Copied";
    setTimeout(() => { event.target.textContent = "Copy Admin Payload"; }, 1200);
    return;
  }

  if (event.target.id === "createProductButton" && currentDraft) {
    if (!confirm(`Create "${currentDraft.title}" at ${currentDraft.price} G&T?`)) return;
    event.target.disabled = true;
    event.target.textContent = "Creating...";
    try {
      const data = await api("/api/admin/products", {
        method: "POST",
        admin: true,
        body: JSON.stringify(currentDraft.payload)
      });
      els.agentAnswer.innerHTML = `<div class="notice">Product created: ${escapeHtml(data.product.title)} at ${data.product.price} G&T.</div>`;
      await loadOwnerData();
    } catch (error) {
      els.agentAnswer.innerHTML = `<div class="notice error">${escapeHtml(error.message)}</div>`;
    } finally {
      event.target.disabled = false;
      event.target.textContent = "Create Product";
    }
  }
});

els.askForm.addEventListener("submit", event => {
  event.preventDefault();
  const prompt = new FormData(event.target).get("prompt");
  els.agentAnswer.textContent = answerPrompt(prompt);
});

(async function init() {
  if (!adminToken) {
    showLocked("Private link");
    return;
  }
  try {
    await loadOwnerData();
  } catch (error) {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    adminToken = "";
    showLocked(error.status === 401 ? "Login expired" : error.message);
  }
})();
