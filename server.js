const http = require("http");
const https = require("https");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");
const fs = require("fs");
const { ensureDb, readDb, writeDb, updateDb, getStorageInfo } = require("./stateStore");

const rootDir = fs.existsSync(path.join(__dirname, "index.html")) ? __dirname : path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "local-admin-1234");
const brevoApiKey = process.env.BREVO_API_KEY || "";
const otpFromEmail = process.env.OTP_FROM_EMAIL || "giveandtake.support@gmail.com";
const otpFromName = process.env.OTP_FROM_NAME || "GIVE & TAKE";
const sessionSecret = process.env.SESSION_SECRET || (process.env.NODE_ENV === "production" ? "" : "local-session-secret");
const supabaseStorageUrl = String(process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseStorageBucket = process.env.SUPABASE_STORAGE_BUCKET || "give-take-uploads";
const isProduction = process.env.NODE_ENV === "production";
const configuredCustomerSessionDays = Number(process.env.CUSTOMER_SESSION_DAYS || 30);
const customerSessionDays = Number.isFinite(configuredCustomerSessionDays)
  ? Math.min(60, Math.max(1, Math.floor(configuredCustomerSessionDays)))
  : 30;
const configuredAdminSessionHours = Number(process.env.ADMIN_SESSION_HOURS || 8);
const adminSessionHours = Number.isFinite(configuredAdminSessionHours)
  ? Math.min(24, Math.max(1, configuredAdminSessionHours))
  : 8;
const customerSessionDurationMs = customerSessionDays * 24 * 60 * 60_000;
const adminSessionDurationMs = adminSessionHours * 60 * 60_000;
const deliveryCharge = 50;
const deliveryFreeThreshold = 799;
const blockedCustomerSellCategories = new Set(["fashion", "clothes", "shoes", "clothes-shoes", "clothes_and_shoes"]);
const rateLimitBuckets = new Map();
const adminSessionCookieName = "give_take_admin_session";
const customerSessionCookieName = "give_take_customer_session";
const configuredAdminAuditLogLimit = Number(process.env.ADMIN_AUDIT_LOG_LIMIT || 250);
const adminAuditLogLimit = Number.isFinite(configuredAdminAuditLogLimit)
  ? Math.min(1000, Math.max(50, Math.floor(configuredAdminAuditLogLimit)))
  : 250;
const maxImageDataUrlLength = 900_000;
const maxImageBinaryBytes = 675_000;
const maxImageBatchBytes = 2_250_000;
const configuredReferralCommissionPercent = Number(process.env.REFERRAL_COMMISSION_PERCENT || 10);
const referralCommissionPercent = Number.isFinite(configuredReferralCommissionPercent)
  ? Math.min(50, Math.max(0, configuredReferralCommissionPercent))
  : 10;

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

const publicStaticFiles = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/styles.css", "styles.css"],
  ["/app.js", "app.js"],
  ["/config.js", "config.js"],
  ["/owner-agent", "owner-agent.html"],
  ["/owner-agent/", "owner-agent.html"],
  ["/owner-agent.html", "owner-agent.html"],
  ["/owner-agent.css", "owner-agent.css"],
  ["/owner-agent.js", "owner-agent.js"]
]);

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' https: data: blob:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://give-take-beckend.onrender.com https://iwcbgztlrieawsvcxntg.supabase.co",
  "media-src 'self' https: data: blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'"
].join("; ");

const securityHeaders = Object.freeze({
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": contentSecurityPolicy
});

function withSecurityHeaders(headers = {}) {
  return {
    ...securityHeaders,
    ...headers
  };
}

function normalizeAllowedOrigin(value) {
  const rawOrigin = String(value || "").trim();
  if (!rawOrigin) return "";
  try {
    return new URL(rawOrigin).origin;
  } catch {
    return rawOrigin.replace(/\/+$/, "");
  }
}

const allowedOrigins = new Set(
  String(process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map(normalizeAllowedOrigin)
    .filter(Boolean)
);

function requestOrigin(req) {
  return normalizeAllowedOrigin(req?.headers?.origin || "");
}

function isAllowedCorsRequest(req) {
  const origin = requestOrigin(req);
  if (!origin) return true;
  if (!isProduction) return true;
  return allowedOrigins.has(origin);
}

function corsHeaders(req) {
  const headers = {
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Give-Take-Admin-Request, X-Give-Take-Customer-Request",
    "Access-Control-Max-Age": "600"
  };
  const origin = requestOrigin(req);
  if (!isProduction) {
    if (origin) {
      headers["Access-Control-Allow-Origin"] = origin;
      headers["Access-Control-Allow-Credentials"] = "true";
      headers["Vary"] = "Origin";
    } else {
      headers["Access-Control-Allow-Origin"] = "*";
    }
  } else if (origin && allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Credentials"] = "true";
    headers["Vary"] = "Origin";
  }
  return headers;
}

function sendCorsBlocked(res) {
  res.writeHead(403, withSecurityHeaders({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Expires": "0",
    ...corsHeaders(res.giveTakeRequest)
  }));
  res.end(JSON.stringify({ error: "Origin not allowed" }));
}

function sendJson(res, status, payload) {
  res.writeHead(status, withSecurityHeaders({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Expires": "0",
    ...corsHeaders(res.giveTakeRequest)
  }));
  res.end(JSON.stringify(payload));
}

function sendJsonDownload(res, status, payload, filename) {
  const safeFilename = String(filename || "give-take-backup.json").replace(/[^a-z0-9._-]/gi, "-");
  res.writeHead(status, withSecurityHeaders({
    "Content-Type": "application/json; charset=utf-8",
    "Content-Disposition": `attachment; filename="${safeFilename}"`,
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Expires": "0",
    ...corsHeaders(res.giveTakeRequest)
  }));
  res.end(JSON.stringify(payload, null, 2));
}

function sendError(res, status, message) {
  sendJson(res, status, { error: message });
}

function logUnexpectedError(req, error, context = "Unexpected server error") {
  const method = req?.method || "UNKNOWN";
  const url = req?.url || "unknown-url";
  console.error(`${context} [${method} ${url}]`, error);
}

function sendUnexpectedError(req, res, error, publicMessage = "Something went wrong. Please try again.") {
  logUnexpectedError(req, error);
  sendError(res, 500, publicMessage);
}

class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function clientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")
    .map(value => value.trim())
    .filter(Boolean);
  const address = forwarded[0] || req.socket?.remoteAddress || "unknown";
  return address.replace(/^::ffff:/, "").slice(0, 128);
}

function privateRateLimitKey(scope, identity) {
  const digest = crypto.createHash("sha256").update(String(identity || "unknown")).digest("hex");
  return `${scope}:${digest}`;
}

function activeRateLimitAttempts(key, windowMs, now = Date.now()) {
  const cutoff = now - windowMs;
  const attempts = (rateLimitBuckets.get(key) || []).filter(timestamp => timestamp > cutoff);
  if (attempts.length) rateLimitBuckets.set(key, attempts);
  else rateLimitBuckets.delete(key);
  return attempts;
}

function sendRateLimitError(res, attempts, windowMs, message) {
  const now = Date.now();
  const oldestAttempt = attempts[0] || now;
  const retryAfterSeconds = Math.max(1, Math.ceil((oldestAttempt + windowMs - now) / 1000));
  res.setHeader("Retry-After", String(retryAfterSeconds));
  return sendError(res, 429, message || "Too many attempts. Please wait and try again.");
}

function enforceRateLimit(res, { scope, identity, limit, windowMs, message, consume = true }) {
  const key = privateRateLimitKey(scope, identity);
  const attempts = activeRateLimitAttempts(key, windowMs);
  if (attempts.length >= limit) {
    sendRateLimitError(res, attempts, windowMs, message);
    return false;
  }
  if (consume) {
    attempts.push(Date.now());
    rateLimitBuckets.set(key, attempts);
  }
  return true;
}

function recordRateLimitAttempt(scope, identity, windowMs) {
  const key = privateRateLimitKey(scope, identity);
  const attempts = activeRateLimitAttempts(key, windowMs);
  attempts.push(Date.now());
  rateLimitBuckets.set(key, attempts);
}

function clearRateLimit(scope, identity) {
  rateLimitBuckets.delete(privateRateLimitKey(scope, identity));
}

function secureStringEqual(first, second) {
  const firstBuffer = Buffer.from(String(first || ""));
  const secondBuffer = Buffer.from(String(second || ""));
  return firstBuffer.length === secondBuffer.length && crypto.timingSafeEqual(firstBuffer, secondBuffer);
}

function signAdminSessionPayload(encodedPayload) {
  return crypto
    .createHmac("sha256", `${sessionSecret}:${adminPassword}`)
    .update(encodedPayload)
    .digest("base64url");
}

function createAdminSessionToken() {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + adminSessionDurationMs;
  const payload = Buffer.from(JSON.stringify({
    type: "admin-session",
    issuedAt,
    expiresAt,
    nonce: crypto.randomBytes(16).toString("hex")
  })).toString("base64url");
  return {
    token: `${payload}.${signAdminSessionPayload(payload)}`,
    expiresAt: new Date(expiresAt).toISOString()
  };
}

function verifyAdminSessionToken(token) {
  if (!adminPassword || !sessionSecret || typeof token !== "string") return false;
  const [encodedPayload, signature, extra] = token.split(".");
  if (!encodedPayload || !signature || extra) return false;
  if (!secureStringEqual(signature, signAdminSessionPayload(encodedPayload))) return false;
  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    const now = Date.now();
    return payload.type === "admin-session"
      && typeof payload.nonce === "string"
      && /^[a-f0-9]{32}$/.test(payload.nonce)
      && Number.isFinite(payload.issuedAt)
      && Number.isFinite(payload.expiresAt)
      && payload.issuedAt <= now + 60_000
      && payload.expiresAt > now
      && payload.expiresAt - payload.issuedAt <= adminSessionDurationMs;
  } catch {
    return false;
  }
}

function parseCookies(req) {
  return String(req.headers.cookie || "")
    .split(";")
    .map(item => item.trim())
    .filter(Boolean)
    .reduce((cookies, item) => {
      const separator = item.indexOf("=");
      if (separator === -1) return cookies;
      const name = item.slice(0, separator).trim();
      const value = item.slice(separator + 1).trim();
      if (name) {
        try {
          cookies[name] = decodeURIComponent(value);
        } catch {
          cookies[name] = value;
        }
      }
      return cookies;
    }, {});
}

function adminCookieToken(req) {
  return parseCookies(req)[adminSessionCookieName] || "";
}

function customerCookieToken(req) {
  return parseCookies(req)[customerSessionCookieName] || "";
}

function adminCookieAttributes(maxAgeSeconds) {
  const attributes = [
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
    "Path=/",
    "HttpOnly"
  ];
  if (isProduction) {
    attributes.push("Secure", "SameSite=None");
  } else {
    attributes.push("SameSite=Lax");
  }
  return attributes.join("; ");
}

function customerCookieAttributes(maxAgeSeconds) {
  const attributes = [
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
    "Path=/",
    "HttpOnly"
  ];
  if (isProduction) {
    attributes.push("Secure", "SameSite=None");
  } else {
    attributes.push("SameSite=Lax");
  }
  return attributes.join("; ");
}

function setAdminSessionCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `${adminSessionCookieName}=${encodeURIComponent(token)}; ${adminCookieAttributes(adminSessionDurationMs / 1000)}`
  );
}

function clearAdminSessionCookie(res) {
  res.setHeader("Set-Cookie", `${adminSessionCookieName}=; ${adminCookieAttributes(0)}`);
}

function setCustomerSessionCookie(res, token) {
  res.setHeader(
    "Set-Cookie",
    `${customerSessionCookieName}=${encodeURIComponent(token)}; ${customerCookieAttributes(customerSessionDurationMs / 1000)}`
  );
}

function clearCustomerSessionCookie(res) {
  res.setHeader("Set-Cookie", `${customerSessionCookieName}=; ${customerCookieAttributes(0)}`);
}

function hasAdminCookieCsrfHeader(req) {
  return req.headers["x-give-take-admin-request"] === "1";
}

function hasCustomerCookieCsrfHeader(req) {
  return req.headers["x-give-take-customer-request"] === "1";
}

setInterval(() => {
  const staleBefore = Date.now() - (2 * 60 * 60_000);
  for (const [key, attempts] of rateLimitBuckets.entries()) {
    if (!attempts.length || attempts.at(-1) < staleBefore) rateLimitBuckets.delete(key);
  }
}, 15 * 60_000).unref();

function requireAdmin(req, res) {
  if (!adminPassword) {
    sendError(res, 503, "Admin password is not configured");
    return false;
  }
  if (!sessionSecret) {
    sendError(res, 503, "Session secret is not configured");
    return false;
  }
  const cookieToken = adminCookieToken(req);
  if (!cookieToken || !verifyAdminSessionToken(cookieToken)) {
    sendError(res, 401, "Admin login required");
    return false;
  }
  if (!hasAdminCookieCsrfHeader(req)) {
    sendError(res, 403, "Admin request verification failed");
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

function cleanText(value, maxLength = 200, options = {}) {
  const multiline = Boolean(options.multiline);
  let text = String(value ?? "").replace(/\0/g, "");
  text = multiline
    ? text.replace(/[^\S\r\n]+/g, " ").replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    : text.replace(/[\u0001-\u001F\u007F]/g, " ").replace(/\s+/g, " ");
  text = text.trim();
  return text.length > maxLength ? text.slice(0, maxLength).trim() : text;
}

function cleanReferralCode(value) {
  const code = cleanText(value, 50).toLowerCase();
  if (!code || !/^[a-z0-9][a-z0-9_-]{1,49}$/.test(code)) return "";
  return code;
}

function cleanStockQuantity(value, fallback = 1, options = {}) {
  const min = Number.isFinite(options.min) ? options.min : 0;
  const max = Number.isFinite(options.max) ? options.max : 100000;
  const quantity = Number(value);
  if (!Number.isFinite(quantity)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(quantity)));
}

function normalizeOrderItems(body) {
  const counts = new Map();
  const addItem = (productId, quantity = 1) => {
    const idValue = cleanText(productId, 80);
    if (!idValue) return;
    const qty = cleanStockQuantity(quantity, 0, { min: 0, max: 100 });
    if (qty < 1) return;
    counts.set(idValue, Math.min(100, Number(counts.get(idValue) || 0) + qty));
  };
  if (Array.isArray(body?.items)) {
    body.items.forEach(item => {
      if (typeof item === "string") addItem(item, 1);
      else addItem(item?.productId || item?.id, item?.quantity || item?.qty || 1);
    });
  } else if (Array.isArray(body?.productIds)) {
    body.productIds.forEach(productId => addItem(productId, 1));
  }
  return [...counts.entries()].map(([productId, quantity]) => ({ productId, quantity }));
}

function cleanReferralAttribution(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const code = cleanReferralCode(value.code);
  if (!code) return null;
  const capturedAt = cleanText(value.capturedAt, 40);
  const capturedTimestamp = new Date(capturedAt || "").getTime();
  const safeCapturedAt = Number.isFinite(capturedTimestamp)
    ? new Date(capturedTimestamp).toISOString()
    : new Date().toISOString();
  return {
    code,
    source: cleanText(value.source || "referral-link", 40),
    landingPage: cleanText(value.landingPage || "", 220),
    capturedAt: safeCapturedAt
  };
}

function publicReferralAttribution(value) {
  const referral = cleanReferralAttribution(value);
  if (!referral) return null;
  return referral;
}

function ensureReferralRecord(db, code) {
  db.referrals = db.referrals && typeof db.referrals === "object" && !Array.isArray(db.referrals) ? db.referrals : {};
  db.referrals[code] = db.referrals[code] && typeof db.referrals[code] === "object" ? db.referrals[code] : {
    code,
    createdAt: new Date().toISOString(),
    visits: 0,
    signups: 0,
    orders: 0,
    totalCoins: 0,
    estimatedCommissionCoins: 0
  };
  db.referrals[code].code = code;
  return db.referrals[code];
}

function recordReferralVisit(db, referral, req) {
  const record = ensureReferralRecord(db, referral.code);
  record.visits = Number(record.visits || 0) + 1;
  record.lastVisitAt = new Date().toISOString();
  record.updatedAt = record.lastVisitAt;
  record.lastLandingPage = referral.landingPage || record.lastLandingPage || "";
  db.referralVisits = Array.isArray(db.referralVisits) ? db.referralVisits : [];
  db.referralVisits.unshift({
    id: id("REF-VISIT"),
    code: referral.code,
    landingPage: referral.landingPage || "",
    capturedAt: referral.capturedAt,
    createdAt: new Date().toISOString(),
    ipHash: hashAuditValue(clientIp(req)),
    userAgent: cleanText(req.headers["user-agent"], 180)
  });
  if (db.referralVisits.length > 1000) db.referralVisits.splice(1000);
}

function attachReferralToUser(db, user, referral) {
  if (!user || !referral?.code) return false;
  if (user.referredBy) return false;
  const record = ensureReferralRecord(db, referral.code);
  user.referredBy = referral.code;
  user.referral = {
    ...referral,
    linkedAt: new Date().toISOString()
  };
  record.signups = Number(record.signups || 0) + 1;
  record.lastSignupAt = user.referral.linkedAt;
  record.updatedAt = user.referral.linkedAt;
  return true;
}

function referralForOrder(user, bodyReferral) {
  const requestReferral = cleanReferralAttribution(bodyReferral);
  const userReferral = cleanReferralAttribution(user?.referral || { code: user?.referredBy });
  return requestReferral || userReferral;
}

function buildOrderReferral(referral, totalCoins) {
  if (!referral?.code) return null;
  const commissionCoins = Math.round(Number(totalCoins || 0) * (referralCommissionPercent / 100));
  return {
    code: referral.code,
    source: referral.source || "referral-link",
    capturedAt: referral.capturedAt || "",
    commissionRatePercent: referralCommissionPercent,
    estimatedCommissionCoins: commissionCoins
  };
}

function recordReferralOrder(db, orderReferral, totalCoins) {
  if (!orderReferral?.code) return;
  const record = ensureReferralRecord(db, orderReferral.code);
  record.orders = Number(record.orders || 0) + 1;
  record.totalCoins = Number(record.totalCoins || 0) + Number(totalCoins || 0);
  record.estimatedCommissionCoins = Number(record.estimatedCommissionCoins || 0) + Number(orderReferral.estimatedCommissionCoins || 0);
  record.lastOrderAt = new Date().toISOString();
  record.updatedAt = record.lastOrderAt;
}

function isValidPhone(value) {
  const phone = cleanText(value, 24);
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15 && /^[+\d()[\]\-\s]+$/.test(phone);
}

function isValidPincode(value) {
  const pincode = cleanText(value, 16);
  return /^[a-z0-9][a-z0-9\s-]{2,15}$/i.test(pincode);
}

function isValidUpiReference(value) {
  const reference = cleanText(value, 80);
  return reference.length >= 4 && /^[a-z0-9@._/\-\s]+$/i.test(reference);
}

function imageBufferMatchesMime(mime, buffer) {
  if (!Buffer.isBuffer(buffer) || !buffer.length) return false;
  if (mime === "image/jpeg") {
    return buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mime === "image/png") {
    return buffer.length > 8
      && buffer[0] === 0x89
      && buffer[1] === 0x50
      && buffer[2] === 0x4e
      && buffer[3] === 0x47
      && buffer[4] === 0x0d
      && buffer[5] === 0x0a
      && buffer[6] === 0x1a
      && buffer[7] === 0x0a;
  }
  if (mime === "image/webp") {
    return buffer.length > 12
      && buffer.toString("ascii", 0, 4) === "RIFF"
      && buffer.toString("ascii", 8, 12) === "WEBP";
  }
  return false;
}

function parseDataImage(value) {
  const image = String(value || "").trim();
  if (!image || image.length > maxImageDataUrlLength) return null;
  const match = image.match(/^data:image\/(png|jpe?g|webp);base64,([a-z0-9+/]+={0,2})$/i);
  if (!match) return null;
  const base64 = match[2];
  if (base64.length % 4 !== 0) return null;
  const mime = match[1].toLowerCase() === "jpg" ? "image/jpeg" : `image/${match[1].toLowerCase()}`;
  const buffer = Buffer.from(base64, "base64");
  if (!buffer.length || buffer.length > maxImageBinaryBytes) return null;
  if (!imageBufferMatchesMime(mime, buffer)) return null;
  return { image, mime, bytes: buffer.length, buffer };
}

function isValidDataImage(value) {
  return Boolean(parseDataImage(value));
}

function cleanDataImages(value, limit = 5) {
  if (!Array.isArray(value)) return [];
  let totalBytes = 0;
  const images = [];
  for (const item of value) {
    if (images.length >= limit) break;
    const parsed = parseDataImage(item);
    if (!parsed || totalBytes + parsed.bytes > maxImageBatchBytes) continue;
    totalBytes += parsed.bytes;
    images.push(parsed.image);
  }
  return images;
}

function isSafeProductImageUrl(value) {
  const imageUrl = String(value || "").trim();
  if (!imageUrl) return true;
  if (/^data:image\//i.test(imageUrl)) return isValidDataImage(imageUrl);
  if (imageUrl.length > 1200) return false;
  try {
    const parsedUrl = new URL(imageUrl);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

function storageIsConfigured() {
  return Boolean(supabaseStorageUrl && supabaseServiceRoleKey && supabaseStorageBucket);
}

function imageExtensionForMime(mime) {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function encodeStoragePath(value) {
  return String(value || "")
    .split("/")
    .map(part => encodeURIComponent(part))
    .join("/");
}

function storagePublicUrl(objectPath) {
  return `${supabaseStorageUrl}/storage/v1/object/public/${encodeURIComponent(supabaseStorageBucket)}/${encodeStoragePath(objectPath)}`;
}

function uploadBufferToSupabaseStorage(objectPath, buffer, mime) {
  return new Promise((resolve, reject) => {
    const target = new URL(`${supabaseStorageUrl}/storage/v1/object/${encodeURIComponent(supabaseStorageBucket)}/${encodeStoragePath(objectPath)}`);
    const request = https.request({
      method: "POST",
      hostname: target.hostname,
      path: `${target.pathname}${target.search}`,
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        "Content-Type": mime,
        "Content-Length": buffer.length,
        "x-upsert": "false",
        "Cache-Control": "31536000"
      }
    }, response => {
      let body = "";
      response.on("data", chunk => {
        body += chunk;
        if (body.length > 50_000) body = body.slice(0, 50_000);
      });
      response.on("end", () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(storagePublicUrl(objectPath));
          return;
        }
        reject(new Error(`Supabase Storage upload failed with ${response.statusCode}: ${body.slice(0, 300)}`));
      });
    });
    request.on("error", reject);
    request.setTimeout(15_000, () => {
      request.destroy(new Error("Supabase Storage upload timed out"));
    });
    request.end(buffer);
  });
}

async function persistImageUploads(images, folder, ownerId) {
  const cleanImages = cleanDataImages(images, 5);
  if (!cleanImages.length || !storageIsConfigured()) return cleanImages;
  const safeFolder = cleanText(folder, 60).replace(/[^a-z0-9/_-]/gi, "-") || "uploads";
  const safeOwner = cleanText(ownerId, 80).replace(/[^a-z0-9_-]/gi, "-") || "owner";
  const today = new Date().toISOString().slice(0, 10);
  const stored = [];
  for (const [index, image] of cleanImages.entries()) {
    const parsed = parseDataImage(image);
    if (!parsed) continue;
    const extension = imageExtensionForMime(parsed.mime);
    const objectPath = `${safeFolder}/${today}/${safeOwner}-${index + 1}-${crypto.randomBytes(6).toString("hex")}.${extension}`;
    try {
      stored.push(await uploadBufferToSupabaseStorage(objectPath, parsed.buffer, parsed.mime));
    } catch (error) {
      console.warn("Image storage upload failed; keeping base64 image fallback:", error.message);
      stored.push(image);
    }
  }
  return stored;
}

async function persistProductImageValue(value, folder, ownerId) {
  const imageUrl = String(value || "").trim();
  if (!/^data:image\//i.test(imageUrl)) return imageUrl;
  const [storedImage] = await persistImageUploads([imageUrl], folder, ownerId);
  return storedImage || imageUrl;
}

function cleanDetailsObject(value, maxEntries = 20) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.entries(value).slice(0, maxEntries).reduce((details, [key, item]) => {
    const cleanKey = cleanText(key, 60);
    const cleanValue = cleanText(item, 300, { multiline: true });
    if (cleanKey && cleanValue) details[cleanKey] = cleanValue;
    return details;
  }, {});
}

function cleanAuditDetails(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.entries(value).slice(0, 12).reduce((details, [key, item]) => {
    const cleanKey = cleanText(key, 60);
    if (!cleanKey) return details;
    if (typeof item === "number" || typeof item === "boolean") {
      details[cleanKey] = item;
      return details;
    }
    details[cleanKey] = cleanText(item, 180);
    return details;
  }, {});
}

function recordAdminAudit(req, action, outcome = "success", details = {}) {
  const entry = {
    id: id("AUDIT"),
    actor: "admin",
    action: cleanText(action, 80),
    outcome: cleanText(outcome, 40),
    createdAt: new Date().toISOString(),
    ipHash: hashAuditValue(clientIp(req)),
    userAgent: cleanText(req.headers["user-agent"], 180),
    origin: cleanText(req.headers.origin, 120),
    path: cleanText(req.url, 160),
    details: cleanAuditDetails(details)
  };
  updateDb(auditDb => {
    auditDb.adminAuditLogs = Array.isArray(auditDb.adminAuditLogs) ? auditDb.adminAuditLogs : [];
    auditDb.adminAuditLogs.unshift(entry);
    if (auditDb.adminAuditLogs.length > adminAuditLogLimit) {
      auditDb.adminAuditLogs.splice(adminAuditLogLimit);
    }
    return { id: entry.id };
  }).catch(error => {
    console.warn("Admin audit log write failed:", error.message);
  });
}

function publicAdminAuditLog(entry) {
  return {
    id: entry.id,
    actor: entry.actor,
    action: entry.action,
    outcome: entry.outcome,
    createdAt: entry.createdAt,
    ipHash: entry.ipHash,
    userAgent: entry.userAgent,
    origin: entry.origin,
    path: entry.path,
    details: cleanAuditDetails(entry.details)
  };
}

function cloneJson(value, fallback) {
  if (value === undefined) return fallback;
  return JSON.parse(JSON.stringify(value));
}

function buildRecoveryBackup(db) {
  const backup = {
    schemaVersion: "give-take-recovery-backup-v1",
    exportedAt: new Date().toISOString(),
    storage: getStorageInfo(),
    data: {
      meta: cloneJson(db.meta, {}),
      maintenance: cloneJson(db.maintenance, {}),
      categories: cloneJson(db.categories, []),
      products: cloneJson(db.products, []),
      users: cloneJson(db.users, []),
      wallets: cloneJson(db.wallets, {}),
      orders: cloneJson(db.orders, []),
      sellRequests: cloneJson(db.sellRequests, []),
      partnerTasks: cloneJson(db.partnerTasks, []),
      joinApplications: cloneJson(db.joinApplications, []),
      rechargeRequests: cloneJson(db.rechargeRequests, []),
      returns: cloneJson(db.returns, []),
      feedbacks: cloneJson(db.feedbacks, []),
      referrals: cloneJson(db.referrals, {}),
      referralVisits: cloneJson(db.referralVisits, []),
      integrations: cloneJson(db.integrations, {}),
      adminAuditLogs: cloneJson(db.adminAuditLogs, [])
    },
    excluded: {
      authOtps: "excluded-security-sensitive-temporary-login-data",
      authSessions: "excluded-security-sensitive-temporary-login-data"
    }
  };
  const checksumSource = JSON.stringify(backup);
  return {
    ...backup,
    checksum: {
      algorithm: "sha256",
      value: crypto.createHash("sha256").update(checksumSource).digest("hex")
    }
  };
}

function hashOtp(email, otp) {
  return crypto.createHash("sha256").update(`${sessionSecret}:${normalizeEmail(email)}:${otp}`).digest("hex");
}

function hashSession(token) {
  return crypto.createHash("sha256").update(`${sessionSecret}:${token}`).digest("hex");
}

function hashAuditValue(value) {
  return crypto.createHash("sha256").update(`${sessionSecret || "give-take-audit"}:${String(value || "unknown")}`).digest("hex").slice(0, 24);
}

function publicUser(user) {
  return user ? { id: user.id, email: user.email, name: user.name || "", addressBook: user.addressBook || null } : null;
}

function adminCustomerSummary(db, limit = 200) {
  const now = Date.now();
  const users = Array.isArray(db.users) ? db.users : [];
  const sessions = Array.isArray(db.authSessions) ? db.authSessions : [];
  const orders = Array.isArray(db.orders) ? db.orders : [];
  const sellRequests = Array.isArray(db.sellRequests) ? db.sellRequests : [];
  const rechargeRequests = Array.isArray(db.rechargeRequests) ? db.rechargeRequests : [];
  const returns = Array.isArray(db.returns) ? db.returns : [];
  const feedbacks = Array.isArray(db.feedbacks) ? db.feedbacks : [];
  const summarize = user => {
    const activeSessions = sessions.filter(session => session.userId === user.id && customerSessionIsValid(session, now));
    const latestSessionAt = sessions
      .filter(session => session.userId === user.id && session.createdAt)
      .map(session => new Date(session.createdAt).getTime())
      .filter(Number.isFinite)
      .sort((a, b) => b - a)[0];
    const wallet = db.wallets?.[user.id] || { balance: 0, ledger: [] };
    return {
      id: user.id,
      email: user.email,
      name: user.name || "",
      createdAt: user.createdAt || "",
      updatedAt: user.updatedAt || "",
      lastLoginAt: user.lastLoginAt || (latestSessionAt ? new Date(latestSessionAt).toISOString() : ""),
      loginCount: Number(user.loginCount || 0),
      activeSession: activeSessions.length > 0,
      activeSessionCount: activeSessions.length,
      sessionExpiresAt: activeSessions
        .map(customerSessionExpiresAtMs)
        .filter(Number.isFinite)
        .sort((a, b) => b - a)
        .map(timestamp => new Date(timestamp).toISOString())[0] || "",
      walletBalance: Number(wallet.balance || 0),
      walletLedgerCount: Array.isArray(wallet.ledger) ? wallet.ledger.length : 0,
      orderCount: orders.filter(order => order.userId === user.id).length,
      sellRequestCount: sellRequests.filter(request => request.userId === user.id).length,
      rechargeRequestCount: rechargeRequests.filter(request => request.userId === user.id).length,
      returnRequestCount: returns.filter(request => request.userId === user.id).length,
      feedbackCount: feedbacks.filter(feedback => feedback.userId === user.id).length
    };
  };
  const summaries = users.map(summarize);
  const customers = summaries
    .sort((a, b) => new Date(b.lastLoginAt || b.createdAt).getTime() - new Date(a.lastLoginAt || a.createdAt).getTime())
    .slice(0, limit);
  return {
    totalUsers: users.length,
    activeUsers: summaries.filter(customer => customer.activeSession).length,
    returned: customers.length,
    customers
  };
}

function adminReferralSummary(db, limit = 100) {
  const users = Array.isArray(db.users) ? db.users : [];
  const orders = Array.isArray(db.orders) ? db.orders : [];
  const referralRecords = db.referrals && typeof db.referrals === "object" && !Array.isArray(db.referrals) ? db.referrals : {};
  const codes = new Set([
    ...Object.keys(referralRecords),
    ...users.map(user => cleanReferralCode(user.referredBy || user.referral?.code)).filter(Boolean),
    ...orders.map(order => cleanReferralCode(order.referral?.code || order.referredBy)).filter(Boolean)
  ]);
  const referrals = [...codes].map(code => {
    const record = referralRecords[code] || {};
    const referredUsers = users.filter(user => cleanReferralCode(user.referredBy || user.referral?.code) === code);
    const referredOrders = orders.filter(order => cleanReferralCode(order.referral?.code || order.referredBy) === code);
    const totalCoins = referredOrders.reduce((sum, order) => sum + Number(order.totalCoins || 0), 0);
    const estimatedCommissionCoins = referredOrders.reduce((sum, order) => {
      if (Number.isFinite(Number(order.referral?.estimatedCommissionCoins))) {
        return sum + Number(order.referral.estimatedCommissionCoins || 0);
      }
      return sum + Math.round(Number(order.totalCoins || 0) * (referralCommissionPercent / 100));
    }, 0);
    const lastOrderAt = referredOrders
      .map(order => new Date(order.createdAt || "").getTime())
      .filter(Number.isFinite)
      .sort((a, b) => b - a)[0];
    return {
      code,
      link: `https://www.giveandtake.co.in/?ref=${encodeURIComponent(code)}`,
      visits: Number(record.visits || 0),
      signups: Math.max(Number(record.signups || 0), referredUsers.length),
      orders: referredOrders.length,
      totalCoins,
      estimatedCommissionCoins,
      commissionRatePercent: referralCommissionPercent,
      lastVisitAt: record.lastVisitAt || "",
      lastSignupAt: record.lastSignupAt || "",
      lastOrderAt: lastOrderAt ? new Date(lastOrderAt).toISOString() : (record.lastOrderAt || ""),
      recentOrders: referredOrders.slice(0, 10).map(order => ({
        id: order.id,
        userEmail: order.userEmail || "",
        totalCoins: Number(order.totalCoins || 0),
        estimatedCommissionCoins: Number(order.referral?.estimatedCommissionCoins || Math.round(Number(order.totalCoins || 0) * (referralCommissionPercent / 100))),
        createdAt: order.createdAt || "",
        status: order.status || ""
      })),
      recentCustomers: referredUsers.slice(0, 10).map(user => ({
        id: user.id,
        email: user.email,
        name: user.name || "",
        createdAt: user.createdAt || "",
        lastLoginAt: user.lastLoginAt || ""
      }))
    };
  }).sort((a, b) => (b.orders - a.orders) || (b.signups - a.signups) || (b.visits - a.visits));
  return {
    commissionRatePercent: referralCommissionPercent,
    totalReferralCodes: referrals.length,
    totalVisits: referrals.reduce((sum, item) => sum + Number(item.visits || 0), 0),
    totalSignups: referrals.reduce((sum, item) => sum + Number(item.signups || 0), 0),
    totalOrders: referrals.reduce((sum, item) => sum + Number(item.orders || 0), 0),
    totalCoins: referrals.reduce((sum, item) => sum + Number(item.totalCoins || 0), 0),
    totalEstimatedCommissionCoins: referrals.reduce((sum, item) => sum + Number(item.estimatedCommissionCoins || 0), 0),
    referrals: referrals.slice(0, limit)
  };
}

function customerSessionExpiresAtMs(session) {
  const storedExpiry = new Date(session?.expiresAt).getTime();
  const createdAt = new Date(session?.createdAt).getTime();
  if (!Number.isFinite(storedExpiry) || !Number.isFinite(createdAt)) return 0;
  return Math.min(storedExpiry, createdAt + customerSessionDurationMs);
}

function customerSessionIsValid(session, now = Date.now()) {
  return customerSessionExpiresAtMs(session) > now;
}

function requireCustomer(req, res, db) {
  if (!sessionSecret) {
    sendError(res, 503, "Session secret is not configured");
    return null;
  }
  const cookieToken = customerCookieToken(req);
  if (!cookieToken) {
    sendError(res, 401, "Login required");
    return null;
  }
  if (!hasCustomerCookieCsrfHeader(req)) {
    sendError(res, 403, "Customer request verification failed");
    return null;
  }
  const session = (db.authSessions || []).find(item => (
    item.tokenHash === hashSession(cookieToken)
    && customerSessionIsValid(item)
  ));
  if (!session) {
    sendError(res, 401, "Session expired");
    return null;
  }
  const user = (db.users || []).find(item => item.id === session.userId);
  if (!user) {
    sendError(res, 401, "User not found");
    return null;
  }
  return { session, user };
}

function isBlockedCustomerSellCategory(value) {
  const category = String(value || "").trim().toLowerCase();
  return blockedCustomerSellCategories.has(category) || /fashion|clothes|shoes/.test(category);
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
  }).filter(item => !item.ok).slice(0, 30);
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
  const payload = {
    model,
    instructions: [
      "You are GIVE & TAKE Admin Ops Agent for a coin-based reuse marketplace in India.",
      "Be operational, concise, and action-first. Do not invent private data.",
      "Use supplied products, orders, inventory diagnostics, and listing input only.",
      "Return only valid json with keys: summary, priority, insights, actions, inventoryIssues, duplicateGroups, orderSummaries, priceHealth, listingDraft, supportDrafts.",
      "Keep customer-facing support drafts polite and short."
    ].join(" "),
    input: JSON.stringify({
      response_format: "json",
      action,
      adminPrompt: prompt || "",
      localReport,
      listingInput: listingInput || {},
      supportInput: supportInput || {}
    }),
    max_output_tokens: 1800,
    text: {
      format: {
        type: "json_object"
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
  const { url, parts } = parsePath(req);
  const method = req.method;

  if (!isAllowedCorsRequest(req)) return sendCorsBlocked(res);
  if (method === "OPTIONS") return sendJson(res, 200, { ok: true });
  const ip = clientIp(req);
  if (!enforceRateLimit(res, {
    scope: "api-general",
    identity: ip,
    limit: 600,
    windowMs: 5 * 60_000,
    message: "Too many requests. Please wait a few minutes and try again."
  })) return;
  const db = await readDb();

  if (method === "GET" && parts[1] === "health") {
    return sendJson(res, 200, {
      ok: true,
      phase: db.meta.phase,
      updatedAt: db.meta.updatedAt,
      storage: getStorageInfo(),
      openai: {
        configured: Boolean(process.env.OPENAI_API_KEY),
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini"
      }
    });
  }

  if (method === "POST" && parts[1] === "auth" && parts[2] === "request-otp") {
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    if (!email || !email.includes("@")) return sendError(res, 400, "Enter a valid email");
    if (!sessionSecret) return sendError(res, 503, "Session secret is not configured");
    if (!enforceRateLimit(res, {
      scope: "otp-request-ip",
      identity: ip,
      limit: 8,
      windowMs: 15 * 60_000,
      message: "Too many OTP requests from this connection. Please wait 15 minutes."
    })) return;
    if (!enforceRateLimit(res, {
      scope: "otp-request-email",
      identity: email,
      limit: 4,
      windowMs: 15 * 60_000,
      message: "Too many OTP requests for this email. Please wait 15 minutes."
    })) return;
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
      logUnexpectedError(req, error, "OTP email delivery failed");
      return sendError(res, 503, "OTP email could not be sent right now. Please try again later.");
    }
    return sendJson(res, 200, { ok: true, expiresInSeconds: 300 });
  }

  if (method === "POST" && parts[1] === "auth" && parts[2] === "verify-otp") {
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    const otp = String(body.otp || "").trim();
    const name = cleanText(body.name, 80);
    const referral = cleanReferralAttribution(body.referral);
    if (!email || !otp) return sendError(res, 400, "Email and OTP are required");
    if (!sessionSecret) return sendError(res, 503, "Session secret is not configured");
    if (!enforceRateLimit(res, {
      scope: "otp-verify-ip",
      identity: ip,
      limit: 15,
      windowMs: 15 * 60_000,
      message: "Too many OTP verification attempts. Please wait 15 minutes."
    })) return;
    if (!enforceRateLimit(res, {
      scope: "otp-verify-email",
      identity: email,
      limit: 8,
      windowMs: 15 * 60_000,
      message: "Too many OTP verification attempts for this email. Please wait 15 minutes."
    })) return;
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
    if (referral) attachReferralToUser(db, user, referral);
    user.lastLoginAt = new Date().toISOString();
    user.loginCount = Number(user.loginCount || 0) + 1;
    const token = crypto.randomBytes(32).toString("hex");
    const session = {
      id: id("SESSION"),
      userId: user.id,
      email,
      tokenHash: hashSession(token),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(now + customerSessionDurationMs).toISOString()
    };
    db.authSessions = db.authSessions.filter(item => customerSessionIsValid(item, now)).slice(0, 200);
    db.authSessions.unshift(session);
    if (!db.wallets[user.id]) db.wallets[user.id] = { balance: 0, ledger: [] };
    await writeDb(db);
    setCustomerSessionCookie(res, token);
    return sendJson(res, 200, { user: publicUser(user), wallet: db.wallets[user.id] });
  }

  if (method === "GET" && parts[1] === "auth" && parts[2] === "me") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    const { user } = customer;
    return sendJson(res, 200, { user: publicUser(user), wallet: db.wallets?.[user.id] || { balance: 0, ledger: [] } });
  }

  if (method === "POST" && parts[1] === "auth" && parts[2] === "logout") {
    const cookieToken = customerCookieToken(req);
    if (cookieToken && !hasCustomerCookieCsrfHeader(req)) {
      return sendError(res, 403, "Customer request verification failed");
    }
    if (cookieToken && sessionSecret) {
      db.authSessions = (db.authSessions || []).filter(item => item.tokenHash !== hashSession(cookieToken));
      await writeDb(db);
    }
    clearCustomerSessionCookie(res);
    return sendJson(res, 200, { ok: true });
  }

  if (method === "PATCH" && parts[1] === "auth" && parts[2] === "address") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    const { user } = customer;
    const body = await readBody(req);
    const addressBook = {
      name: cleanText(body.name, 80),
      phone: cleanText(body.phone, 24),
      houseArea: cleanText(body.houseArea, 220),
      city: cleanText(body.city, 80),
      pincode: cleanText(body.pincode, 16),
      landmark: cleanText(body.landmark, 120),
    };
    if (!addressBook.name) return sendError(res, 400, "Name is required");
    if (!addressBook.phone) return sendError(res, 400, "Phone number is required");
    if (!isValidPhone(addressBook.phone)) return sendError(res, 400, "Enter a valid phone number");
    if (!addressBook.houseArea) return sendError(res, 400, "House/area is required");
    if (!serviceableCity(db, addressBook.city)) return sendError(res, 400, "City is not serviceable yet");
    if (!addressBook.pincode) return sendError(res, 400, "Pincode is required");
    if (!isValidPincode(addressBook.pincode)) return sendError(res, 400, "Enter a valid pincode");
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
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    if (parts[2] !== customer.user.id) return sendError(res, 403, "You can only access your own wallet");
    const wallet = db.wallets[customer.user.id] || { balance: 0, ledger: [] };
    return sendJson(res, 200, { wallet });
  }

  if (method === "POST" && parts[1] === "wallet" && parts[2] === "recharge") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    if (!enforceRateLimit(res, {
      scope: "wallet-recharge-user",
      identity: customer.user.id,
      limit: 8,
      windowMs: 60 * 60_000,
      message: "Too many recharge requests. Please wait before submitting another one."
    })) return;
    const body = await readBody(req);
    const userId = customer.user.id;
    if (!db.wallets[userId]) db.wallets[userId] = { balance: 0, ledger: [] };
    const amount = Number(body.amount);
    const paymentMethod = cleanText(body.method || "UPI", 20).toUpperCase();
    const upiReference = cleanText(body.upiReference, 80);
    if (!Number.isInteger(amount) || amount < db.meta.coinRechargeMinimum || amount > 100000 || amount % db.meta.coinRechargeStep !== 0) {
      return sendError(res, 400, "Recharge must be minimum 50 and in multiples of 50");
    }
    if (paymentMethod !== "UPI") {
      return sendError(res, 400, "Only UPI recharge is enabled");
    }
    if (!isValidUpiReference(upiReference)) {
      return sendError(res, 400, "Enter a valid UPI transaction/reference ID");
    }
    if (!db.integrations.payments.upi?.upiId) {
      return sendError(res, 400, "Admin UPI ID is not configured yet");
    }
    const rechargeRequest = {
      id: id("GT-UPI"),
      userId,
      userEmail: customer.user.email,
      amount,
      method: "UPI",
      upiId: db.integrations.payments.upi.upiId,
      upiReference,
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
    const city = cleanText(body.city, 80);
    return sendJson(res, 200, {
      city,
      serviceable: serviceableCity(db, city),
      activeCities: db.meta.serviceCities
    });
  }

  if (method === "POST" && parts[1] === "referrals" && parts[2] === "track") {
    if (!enforceRateLimit(res, {
      scope: "referral-track-ip",
      identity: ip,
      limit: 60,
      windowMs: 60 * 60_000,
      message: "Too many referral tracking requests. Please wait before trying again."
    })) return;
    const body = await readBody(req);
    const referral = cleanReferralAttribution(body.referral);
    if (!referral) return sendJson(res, 200, { ok: true, tracked: false });
    recordReferralVisit(db, referral, req);
    await writeDb(db);
    return sendJson(res, 200, { ok: true, tracked: true });
  }

  if (method === "POST" && parts[1] === "sell-requests") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    if (!enforceRateLimit(res, {
      scope: "sell-request-user",
      identity: customer.user.id,
      limit: 5,
      windowMs: 60 * 60_000,
      message: "Too many selling submissions. Please wait before submitting another product."
    })) return;
    const body = await readBody(req);
    const city = cleanText(body.city, 80);
    const category = cleanText(body.category, 80);
    const sellerName = cleanText(body.sellerName, 80);
    const sellerPhone = cleanText(body.sellerPhone, 24);
    const pickupAddress = cleanText(body.pickupAddress, 240);
    const pickupDate = cleanText(body.pickupDate, 40);
    const pickupTime = cleanText(body.pickupTime, 40);
    const title = cleanText(body.title, 120);
    const condition = cleanText(body.condition, 80);
    const expectedCoins = Number(body.expectedCoins || 0);
    if (!serviceableCity(db, city)) return sendError(res, 400, "City is not serviceable yet");
    if (!db.categories.some(item => item.id === category)) return sendError(res, 400, "Select a valid category");
    if (isBlockedCustomerSellCategory(category)) {
      return sendError(res, 400, "Clothes and shoes are not accepted from customer sellers");
    }
    if (!sellerName) return sendError(res, 400, "Seller name is required");
    if (!sellerPhone) return sendError(res, 400, "Seller phone number is required for pickup");
    if (!isValidPhone(sellerPhone)) return sendError(res, 400, "Enter a valid seller phone number");
    if (!pickupAddress) return sendError(res, 400, "Pickup address is required");
    if (!title) return sendError(res, 400, "Product title is required");
    if (!Number.isFinite(expectedCoins) || expectedCoins < 0 || expectedCoins > 100000) {
      return sendError(res, 400, "Expected coin value is invalid");
    }
    const cleanPhotos = cleanDataImages(body.photos, 5);
    if (cleanPhotos.length < 4 || cleanPhotos.length > 5) return sendError(res, 400, "Please upload minimum 4 and maximum 5 product photos");
    const requestId = id("GT-S");
    const photos = await persistImageUploads(cleanPhotos, "sell-requests", `${customer.user.id}-${requestId}`);
    const request = {
      id: requestId,
      userId: customer.user.id,
      userEmail: customer.user.email,
      sellerName,
      sellerPhone,
      pickupAddress,
      pickupDate,
      pickupTime,
      city,
      category,
      title,
      expectedCoins,
      condition,
      details: cleanDetailsObject(body.details),
      photos,
      photoStorage: photos.every(photo => /^https?:\/\//i.test(photo)) ? "supabase-storage" : "mixed-or-base64",
      status: "upload-submitted",
      timeline: ["upload-submitted"],
      createdAt: new Date().toISOString()
    };
    db.sellRequests.unshift(request);
    await writeDb(db);
    return sendJson(res, 201, { sellRequest: request });
  }

  if (method === "GET" && parts[1] === "sell-requests") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    const sellRequests = db.sellRequests.filter(request => request.userId === customer.user.id);
    return sendJson(res, 200, { sellRequests });
  }

  if (method === "POST" && parts[1] === "orders") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    if (!enforceRateLimit(res, {
      scope: "checkout-user",
      identity: customer.user.id,
      limit: 20,
      windowMs: 15 * 60_000,
      message: "Too many checkout attempts. Please wait a few minutes and try again."
    })) return;
    const body = await readBody(req);
    const userId = customer.user.id;
    const orderItems = normalizeOrderItems(body);
    const incomingReferral = cleanReferralAttribution(body.referral);
    const rawDeliveryDetails = body.deliveryDetails || {};
    const deliveryDetails = {
      name: cleanText(rawDeliveryDetails.name, 80),
      phone: cleanText(rawDeliveryDetails.phone, 24),
      address: cleanText(rawDeliveryDetails.address, 240),
      city: cleanText(rawDeliveryDetails.city || body.city, 80),
      pincode: cleanText(rawDeliveryDetails.pincode, 16),
      landmark: cleanText(rawDeliveryDetails.landmark, 120),
      note: cleanText(rawDeliveryDetails.note, 300, { multiline: true })
    };
    const deliveryCity = deliveryDetails.city;
    if (!orderItems.length) return sendError(res, 400, "No products selected");
    if (!deliveryDetails.name) return sendError(res, 400, "Customer name is required");
    if (!deliveryDetails.phone) return sendError(res, 400, "Customer phone is required");
    if (!isValidPhone(deliveryDetails.phone)) return sendError(res, 400, "Enter a valid customer phone number");
    if (!deliveryDetails.address) return sendError(res, 400, "Delivery address is required");
    if (deliveryDetails.pincode && !isValidPincode(deliveryDetails.pincode)) return sendError(res, 400, "Enter a valid pincode");

    let checkout;
    try {
      checkout = await updateDb(transactionDb => {
        const sessionStillValid = (transactionDb.authSessions || []).some(session => (
          session.tokenHash === customer.session.tokenHash
          && session.userId === userId
          && customerSessionIsValid(session)
        ));
        const user = (transactionDb.users || []).find(item => item.id === userId);
        if (!sessionStillValid || !user) throw new RequestError(401, "Session expired");
        if (!serviceableCity(transactionDb, deliveryCity)) {
          throw new RequestError(400, "Delivery city is not serviceable yet");
        }

        const selectedItems = orderItems.map(item => ({
          ...item,
          product: transactionDb.products.find(product => product.id === item.productId)
        }));
        if (selectedItems.some(item => !item.product)) {
          throw new RequestError(400, "One or more selected products no longer exist");
        }
        if (selectedItems.some(item => item.product.status !== "listed" || Number(item.product.quantity || 0) < 1)) {
          throw new RequestError(409, "One or more selected products are no longer available");
        }
        const lowStockItem = selectedItems.find(item => cleanStockQuantity(item.product.quantity, 0) < item.quantity);
        if (lowStockItem) {
          throw new RequestError(409, `${lowStockItem.product.title || "Product"} has only ${cleanStockQuantity(lowStockItem.product.quantity, 0)} left`);
        }

        const totalCoins = selectedItems.reduce((sum, item) => sum + (Number(item.product.price || 0) * item.quantity), 0);
        if (!Number.isFinite(totalCoins) || totalCoins <= 0) {
          throw new RequestError(400, "Selected products have an invalid price");
        }
        const wallet = transactionDb.wallets[userId] || { balance: 0, ledger: [] };
        if (Number(wallet.balance || 0) < totalCoins) {
          throw new RequestError(400, "Wallet has insufficient coins");
        }

        const orderDeliveryCharge = totalCoins > deliveryFreeThreshold ? 0 : deliveryCharge;
        if (incomingReferral) attachReferralToUser(transactionDb, user, incomingReferral);
        const orderReferral = buildOrderReferral(referralForOrder(user, incomingReferral), totalCoins);
        addLedger(transactionDb, userId, "debit", totalCoins, "Product purchase");
        selectedItems.forEach(({ product, quantity }) => {
          product.quantity = cleanStockQuantity(product.quantity, 0) - quantity;
          product.status = product.quantity > 0 ? "listed" : "sold";
          product.sold = Number(product.sold || 0) + quantity;
          product.updatedAt = new Date().toISOString();
        });
        const productIds = selectedItems.flatMap(item => Array(item.quantity).fill(item.product.id));
        const order = {
          id: id("GT-O"),
          userId,
          userEmail: user.email,
          productIds,
          items: selectedItems.map(({ product, quantity }) => ({
            productId: product.id,
            quantity,
            unitPrice: Number(product.price || 0),
            lineTotal: Number(product.price || 0) * quantity
          })),
          products: selectedItems.map(({ product, quantity }) => ({
            id: product.id,
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity,
            qty: quantity,
            unitPrice: Number(product.price || 0),
            lineTotal: Number(product.price || 0) * quantity,
            condition: product.condition,
            category: product.category,
            imageUrl: product.imageUrl || "",
            images: Array.isArray(product.images) ? product.images : []
          })),
          totalCoins,
          status: "new-order",
          deliveryCity,
          deliveryDetails: {
            name: deliveryDetails.name,
            phone: deliveryDetails.phone,
            address: deliveryDetails.address,
            city: deliveryCity,
            pincode: deliveryDetails.pincode,
            landmark: deliveryDetails.landmark,
            note: deliveryDetails.note
          },
          deliveryCharge: orderDeliveryCharge,
          deliveryFreeThreshold,
          deliveryChargeMode: body.deliveryChargeMode || "cod-rupees",
          referral: orderReferral,
          referredBy: orderReferral?.code || "",
          timeline: ["order-placed", "coins-deducted", "new-order"],
          createdAt: new Date().toISOString()
        };
        user.addressBook = {
          name: order.deliveryDetails.name,
          phone: order.deliveryDetails.phone,
          houseArea: order.deliveryDetails.address,
          city: order.deliveryDetails.city,
          pincode: order.deliveryDetails.pincode,
          landmark: order.deliveryDetails.landmark,
        };
        user.updatedAt = new Date().toISOString();
        transactionDb.orders.unshift(order);
        recordReferralOrder(transactionDb, orderReferral, totalCoins);
        return { order, wallet: transactionDb.wallets[userId], user };
      });
    } catch (error) {
      if (error instanceof RequestError) return sendError(res, error.status, error.message);
      throw error;
    }

    const { order, wallet, user } = checkout;
    let confirmationEmailSent = false;
    let confirmationEmailWarning = "";
    try {
      await sendOrderConfirmationEmail(order.userEmail, order);
      confirmationEmailSent = true;
    } catch (error) {
      confirmationEmailWarning = "Order placed, but confirmation email could not be sent.";
      console.warn(`${confirmationEmailWarning} ${error.message}`);
    }
    return sendJson(res, 201, { order, wallet, user: publicUser(user), confirmationEmailSent, confirmationEmailWarning });
  }

  if (method === "GET" && parts[1] === "orders") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    const visibleOrders = db.orders.filter(order => order.userId === customer.user.id);
    const orders = visibleOrders.map(order => {
      const snapshots = Array.isArray(order.products) ? order.products : [];
      const productIds = [...new Set(Array.isArray(order.productIds) ? order.productIds : [])];
      const snapshotIds = new Set(snapshots.map(snapshot => snapshot.productId || snapshot.id));
      const sourceProducts = [
        ...snapshots,
        ...productIds.filter(productId => !snapshotIds.has(productId)).map(productId => ({ id: productId, productId }))
      ];
      return {
        ...order,
        products: sourceProducts.map(snapshot => {
          const productId = snapshot.productId || snapshot.id;
          const catalogProduct = db.products.find(product => product.id === productId);
          return {
            ...snapshot,
            id: snapshot.id || catalogProduct?.id || productId,
            productId,
            title: snapshot.title || catalogProduct?.title || "Product",
            price: Number(snapshot.price ?? catalogProduct?.price ?? 0),
            condition: snapshot.condition || catalogProduct?.condition || "",
            category: snapshot.category || catalogProduct?.category || "",
            imageUrl: snapshot.imageUrl || catalogProduct?.imageUrl || "",
            images: Array.isArray(snapshot.images) && snapshot.images.length
              ? snapshot.images
              : (Array.isArray(catalogProduct?.images) ? catalogProduct.images : [])
          };
        })
      };
    });
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
    recordAdminAudit(req, "admin.order.status-update", "success", {
      orderId: order.id,
      status: order.status
    });
    return sendJson(res, 200, { order });
  }

  if (method === "POST" && parts[1] === "returns") {
    const customer = requireCustomer(req, res, db);
    if (!customer) return;
    if (!enforceRateLimit(res, {
      scope: "return-request-user",
      identity: customer.user.id,
      limit: 10,
      windowMs: 60 * 60_000,
      message: "Too many return requests. Please wait before trying again."
    })) return;
    const body = await readBody(req);
    const orderId = cleanText(body.orderId, 80);
    const issueCategory = cleanText(body.issueCategory, 80);
    const explanation = cleanText(body.explanation, 1000, { multiline: true });
    const cleanProofFiles = cleanDataImages(body.proofFiles, 5);
    const order = (db.orders || []).find(item => item.id === orderId && item.userId === customer.user.id);
    if (!order) return sendError(res, 404, "Order not found");
    if (!issueCategory) return sendError(res, 400, "Return issue category is required");
    if (!explanation) return sendError(res, 400, "Return explanation is required");
    const returnId = id("GT-R");
    const proofFiles = await persistImageUploads(cleanProofFiles, "return-proofs", `${customer.user.id}-${returnId}`);
    const request = {
      id: returnId,
      orderId: order.id,
      userId: customer.user.id,
      userEmail: customer.user.email,
      issueCategory,
      explanation,
      proofFiles,
      proofFileStorage: proofFiles.length && proofFiles.every(file => /^https?:\/\//i.test(file)) ? "supabase-storage" : "mixed-or-base64",
      status: "return-requested",
      createdAt: new Date().toISOString()
    };
    db.returns.unshift(request);
    await writeDb(db);
    return sendJson(res, 201, { returnRequest: request });
  }

  if (method === "POST" && parts[1] === "feedbacks") {
    const hasCustomerAuth = Boolean(customerCookieToken(req));
    const customer = hasCustomerAuth ? requireCustomer(req, res, db) : null;
    if (hasCustomerAuth && !customer) return;
    if (!enforceRateLimit(res, {
      scope: "feedback-ip",
      identity: ip,
      limit: 10,
      windowMs: 60 * 60_000,
      message: "Too many feedback submissions. Please wait before submitting again."
    })) return;
    const body = await readBody(req);
    const overallRating = Number(body.overallRating);
    const browsingExperience = cleanText(body.browsingExperience, 120);
    const priceFeeling = cleanText(body.priceFeeling, 120);
    const paymentClarity = cleanText(body.paymentClarity, 120);
    const improvement = cleanText(body.improvement, 1000, { multiline: true });
    if (!Number.isInteger(overallRating) || overallRating < 1 || overallRating > 5) {
      return sendError(res, 400, "Select an overall rating");
    }
    if (!browsingExperience || !priceFeeling || !paymentClarity || !improvement) {
      return sendError(res, 400, "Please answer all feedback questions");
    }
    const feedback = {
      id: id("GT-F"),
      userId: customer?.user.id || "",
      userEmail: customer?.user.email || "",
      overallRating,
      browsingExperience,
      priceFeeling,
      paymentClarity,
      improvement,
      createdAt: new Date().toISOString()
    };
    db.feedbacks = db.feedbacks || [];
    db.feedbacks.unshift(feedback);
    db.feedbacks = db.feedbacks.slice(0, 500);
    await writeDb(db);
    return sendJson(res, 201, { feedback: { id: feedback.id, createdAt: feedback.createdAt } });
  }

  if (method === "POST" && parts[1] === "join-applications") {
    if (!enforceRateLimit(res, {
      scope: "join-application-ip",
      identity: ip,
      limit: 5,
      windowMs: 60 * 60_000,
      message: "Too many applications submitted. Please wait before trying again."
    })) return;
    const body = await readBody(req);
    const role = cleanText(body.role, 80);
    const city = cleanText(body.city, 80);
    const name = cleanText(body.name, 80);
    const phone = cleanText(body.phone, 24);
    const experience = cleanText(body.experience, 1000, { multiline: true });
    if (!role) return sendError(res, 400, "Role is required");
    if (!city) return sendError(res, 400, "City is required");
    if (!name) return sendError(res, 400, "Name is required");
    if (!phone || !isValidPhone(phone)) return sendError(res, 400, "Enter a valid phone number");
    const application = {
      id: id("GT-J"),
      role,
      city,
      name,
      phone,
      experience,
      status: "submitted",
      createdAt: new Date().toISOString()
    };
    db.joinApplications.unshift(application);
    await writeDb(db);
    return sendJson(res, 201, { application });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "login") {
    const adminLoginLimit = {
      scope: "admin-login-failure",
      identity: ip,
      limit: 5,
      windowMs: 15 * 60_000,
      message: "Too many incorrect admin login attempts. Please wait 15 minutes."
    };
    if (!enforceRateLimit(res, { ...adminLoginLimit, consume: false })) return;
    const body = await readBody(req);
    if (!adminPassword) return sendError(res, 503, "Admin password is not configured");
    if (!sessionSecret) return sendError(res, 503, "Session secret is not configured");
    if (!secureStringEqual(body.password, adminPassword)) {
      recordRateLimitAttempt(adminLoginLimit.scope, adminLoginLimit.identity, adminLoginLimit.windowMs);
      recordAdminAudit(req, "admin.login", "failure", { reason: "wrong-password" });
      return sendError(res, 401, "Wrong admin password");
    }
    clearRateLimit(adminLoginLimit.scope, adminLoginLimit.identity);
    const adminSession = createAdminSessionToken();
    setAdminSessionCookie(res, adminSession.token);
    recordAdminAudit(req, "admin.login", "success", { expiresAt: adminSession.expiresAt });
    return sendJson(res, 200, { expiresAt: adminSession.expiresAt });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "logout") {
    if (!hasAdminCookieCsrfHeader(req)) {
      recordAdminAudit(req, "admin.logout", "failure", { reason: "csrf-check-failed" });
      return sendError(res, 403, "Admin request verification failed");
    }
    clearAdminSessionCookie(res);
    recordAdminAudit(req, "admin.logout", "success");
    return sendJson(res, 200, { ok: true });
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
      quantity: cleanStockQuantity(product.quantity, 0),
      sold: Number(product.sold || 0),
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
        joinApplications: visibleJoinApplications.length,
        feedbacks: (db.feedbacks || []).length
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

  if (method === "GET" && parts[1] === "admin" && parts[2] === "audit-logs") {
    if (!requireAdmin(req, res)) return;
    const requestedLimit = Number(url.searchParams.get("limit") || 50);
    const limit = Number.isFinite(requestedLimit) ? Math.min(100, Math.max(1, requestedLimit)) : 50;
    const logs = Array.isArray(db.adminAuditLogs) ? db.adminAuditLogs : [];
    return sendJson(res, 200, {
      logs: logs.slice(0, limit).map(publicAdminAuditLog),
      totalStored: logs.length
    });
  }

  if (method === "GET" && parts[1] === "admin" && parts[2] === "customers") {
    if (!requireAdmin(req, res)) return;
    if (!enforceRateLimit(res, {
      scope: "admin-customers-ip",
      identity: ip,
      limit: 60,
      windowMs: 60 * 60_000,
      message: "Too many customer list requests. Please wait before trying again."
    })) return;
    const requestedLimit = Number(url.searchParams.get("limit") || 200);
    const limit = Number.isFinite(requestedLimit) ? Math.min(500, Math.max(1, requestedLimit)) : 200;
    const data = adminCustomerSummary(db, limit);
    recordAdminAudit(req, "admin.customers.view", "success", {
      returned: data.returned,
      totalUsers: data.totalUsers
    });
    return sendJson(res, 200, data);
  }

  if (method === "GET" && parts[1] === "admin" && parts[2] === "referrals") {
    if (!requireAdmin(req, res)) return;
    if (!enforceRateLimit(res, {
      scope: "admin-referrals-ip",
      identity: ip,
      limit: 60,
      windowMs: 60 * 60_000,
      message: "Too many referral report requests. Please wait before trying again."
    })) return;
    const requestedLimit = Number(url.searchParams.get("limit") || 100);
    const limit = Number.isFinite(requestedLimit) ? Math.min(250, Math.max(1, requestedLimit)) : 100;
    const data = adminReferralSummary(db, limit);
    recordAdminAudit(req, "admin.referrals.view", "success", {
      returned: data.referrals.length,
      totalReferralCodes: data.totalReferralCodes
    });
    return sendJson(res, 200, data);
  }

  if (method === "GET" && parts[1] === "admin" && parts[2] === "backup" && parts[3] === "export") {
    if (!requireAdmin(req, res)) return;
    if (!enforceRateLimit(res, {
      scope: "admin-backup-export-ip",
      identity: ip,
      limit: 5,
      windowMs: 60 * 60_000,
      message: "Too many backup exports. Please wait before trying again."
    })) return;
    const backup = buildRecoveryBackup(db);
    recordAdminAudit(req, "admin.backup.export", "success", {
      schemaVersion: backup.schemaVersion,
      checksum: backup.checksum.value,
      productCount: backup.data.products.length,
      orderCount: backup.data.orders.length,
      userCount: backup.data.users.length
    });
    const timestamp = backup.exportedAt.replace(/[:.]/g, "-");
    return sendJsonDownload(res, 200, backup, `give-take-backup-${timestamp}.json`);
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "ops-agent") {
    if (!requireAdmin(req, res)) return;
    if (!enforceRateLimit(res, {
      scope: "admin-ops-agent-ip",
      identity: ip,
      limit: 30,
      windowMs: 60 * 60_000,
      message: "Too many admin agent requests. Please wait before trying again."
    })) return;
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
    const openAiConfigured = Boolean(process.env.OPENAI_API_KEY);
    const fallbackReport = {
      summary: openAiConfigured
        ? "Local admin diagnostics are ready. AI call failed, so fallback diagnostics are shown."
        : "Local admin diagnostics are ready. Configure OPENAI_API_KEY for AI-written recommendations.",
      priority: localReport.inventoryIssues.length || localReport.priceHealth.length ? "Review inventory issues" : "Healthy",
      insights: [
        ...(ai?.error ? [`AI error: ${ai.error}`] : []),
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
    recordAdminAudit(req, "admin.ops-agent.run", "success", {
      action,
      aiConfigured: openAiConfigured,
      aiError: Boolean(ai?.error)
    });
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
    recordAdminAudit(req, shouldArchive ? "admin.archive" : "admin.unarchive", "success", {
      type: body.type,
      itemId: body.id
    });
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
    recordAdminAudit(req, "admin.payments.upi-update", "success", {
      merchantName: db.integrations.payments.upi.merchantName,
      upiChanged: true
    });
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
    recordAdminAudit(req, "admin.recharge.approve", "success", {
      rechargeId: rechargeRequest.id,
      amount: rechargeRequest.amount,
      userId: rechargeRequest.userId
    });
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
    recordAdminAudit(req, "admin.recharge.reject", "success", {
      rechargeId: rechargeRequest.id,
      amount: rechargeRequest.amount,
      userId: rechargeRequest.userId
    });
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
    recordAdminAudit(req, `admin.join-application.${application.status}`, "success", {
      applicationId: application.id,
      role: application.role,
      city: application.city
    });
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
    recordAdminAudit(req, `admin.sell-request.${parts[4]}`, "success", {
      requestId: request.id,
      status: request.status,
      finalCoins: Number(request.finalCoins || 0)
    });
    return sendJson(res, 200, { sellRequest: request, wallet: db.wallets[request.userId] });
  }

  if (method === "PATCH" && parts[1] === "admin" && parts[2] === "maintenance") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    db.maintenance = { ...db.maintenance, ...body };
    await writeDb(db);
    recordAdminAudit(req, "admin.maintenance.update", "success", {
      full: Boolean(db.maintenance.full),
      pausedFeatureCount: Array.isArray(db.maintenance.pausedFeatures) ? db.maintenance.pausedFeatures.length : 0
    });
    return sendJson(res, 200, { maintenance: db.maintenance });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "products" && parts[3] === "sync-browser-prices") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const clientCatalog = Array.isArray(body.clientCatalog) ? body.clientCatalog.slice(0, 300) : [];
    const browserPrices = new Map(clientCatalog
      .filter(item => item?.id && Number.isFinite(Number(item.price)) && Number(item.price) >= 0)
      .map(item => [String(item.id), Number(item.price)]));
    const updatedProducts = [];
    for (const product of db.products || []) {
      if (!browserPrices.has(product.id)) continue;
      const browserPrice = browserPrices.get(product.id);
      if (Number(product.price) === browserPrice) continue;
      product.price = browserPrice;
      product.updatedAt = new Date().toISOString();
      updatedProducts.push(product);
    }
    if (updatedProducts.length) await writeDb(db);
    recordAdminAudit(req, "admin.products.sync-browser-prices", "success", {
      updatedCount: updatedProducts.length
    });
    return sendJson(res, 200, {
      updatedCount: updatedProducts.length,
      products: updatedProducts
    });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "products" && parts[3] === "reset-stock") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const quantity = cleanStockQuantity(body.quantity, 5, { min: 1, max: 100000 });
    const productsToUpdate = Array.isArray(db.products) ? db.products : [];
    productsToUpdate.forEach(product => {
      product.quantity = quantity;
      if (product.status === "sold") product.status = "listed";
      product.updatedAt = new Date().toISOString();
    });
    await writeDb(db);
    recordAdminAudit(req, "admin.products.reset-stock", "success", {
      updatedCount: productsToUpdate.length,
      quantity
    });
    return sendJson(res, 200, {
      updatedCount: productsToUpdate.length,
      quantity,
      products: productsToUpdate
    });
  }

  if (method === "POST" && parts[1] === "admin" && parts[2] === "products") {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const productId = id("p");
    const imageUrl = await persistProductImageValue(body.imageUrl, "admin-products", productId);
    if (!isSafeProductImageUrl(imageUrl)) return sendError(res, 400, "Product image must be a valid image URL or uploaded image file");
    const quantity = cleanStockQuantity(body.quantity, 5, { min: 1, max: 100000 });
    const product = {
      id: productId,
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
      imageUrl,
      imageStorage: /^https?:\/\/.*\/storage\/v1\/object\/public\//i.test(imageUrl) ? "supabase-storage" : "url-or-base64",
      status: "listed",
      quantity,
      newest: db.products.length + 1,
      returnWindowHours: 48,
      owner: "give-and-take",
      sourceType: "admin-inventory"
    };
    db.products.unshift(product);
    await writeDb(db);
    recordAdminAudit(req, "admin.product.create", "success", {
      productId: product.id,
      category: product.category,
      status: product.status,
      price: product.price,
      quantity: product.quantity
    });
    return sendJson(res, 201, { product });
  }

  if (method === "PATCH" && parts[1] === "admin" && parts[2] === "products" && parts[3]) {
    if (!requireAdmin(req, res)) return;
    const body = await readBody(req);
    const product = db.products.find(item => item.id === parts[3]);
    if (!product) return sendError(res, 404, "Product not found");
    const previousProduct = {
      status: product.status,
      price: product.price,
      category: product.category,
      quantity: cleanStockQuantity(product.quantity, 0)
    };
    if (typeof body.title === "string" && body.title.trim()) product.title = body.title.trim();
    if (typeof body.category === "string" && body.category.trim()) product.category = body.category.trim();
    if (typeof body.condition === "string" && body.condition.trim()) product.condition = body.condition.trim();
    if (typeof body.imageUrl === "string") {
      const imageUrl = await persistProductImageValue(body.imageUrl, "admin-products", product.id);
      if (!isSafeProductImageUrl(imageUrl)) return sendError(res, 400, "Product image must be a valid image URL or uploaded image file");
      product.imageUrl = imageUrl;
      product.imageStorage = /^https?:\/\/.*\/storage\/v1\/object\/public\//i.test(imageUrl) ? "supabase-storage" : "url-or-base64";
    }
    if (body.price !== undefined) {
      const price = Number(body.price);
      if (!Number.isFinite(price) || price < 0) return sendError(res, 400, "Product price is invalid");
      product.price = price;
    }
    if (body.quantity !== undefined) {
      const quantity = cleanStockQuantity(body.quantity, NaN, { min: 0, max: 100000 });
      if (!Number.isFinite(quantity)) return sendError(res, 400, "Product quantity is invalid");
      product.quantity = quantity;
      if (quantity < 1) product.status = "sold";
      if (quantity > 0 && product.status === "sold" && body.status === undefined) product.status = "listed";
    }
    if (typeof body.status === "string" && body.status === "listed" && cleanStockQuantity(product.quantity, 0) < 1) {
      return sendError(res, 400, "Set product quantity above 0 before listing");
    }
    if (typeof body.status === "string" && ["listed", "unlisted", "sold"].includes(body.status)) product.status = body.status;
    product.updatedAt = new Date().toISOString();
    await writeDb(db);
    recordAdminAudit(req, "admin.product.update", "success", {
      productId: product.id,
      fromStatus: previousProduct.status,
      toStatus: product.status,
      fromPrice: previousProduct.price,
      toPrice: product.price,
      fromCategory: previousProduct.category,
      toCategory: product.category,
      fromQuantity: previousProduct.quantity,
      toQuantity: product.quantity
    });
    return sendJson(res, 200, { product });
  }

  if (method === "DELETE" && parts[1] === "admin" && parts[2] === "products" && parts[3]) {
    if (!requireAdmin(req, res)) return;
    const index = db.products.findIndex(item => item.id === parts[3]);
    if (index === -1) return sendError(res, 404, "Product not found");
    const [product] = db.products.splice(index, 1);
    await writeDb(db);
    recordAdminAudit(req, "admin.product.delete", "success", {
      productId: product.id,
      category: product.category,
      status: product.status,
      price: product.price
    });
    return sendJson(res, 200, { product });
  }

  return sendError(res, 404, "API route not found");
}

function serveStatic(req, res) {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, withSecurityHeaders({ "Content-Type": "text/plain; charset=utf-8", "Allow": "GET, HEAD" }));
    res.end("Method not allowed");
    return;
  }

  const { url } = parsePath(req);
  let requestPath = "";
  try {
    requestPath = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400, withSecurityHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
    res.end("Bad request");
    return;
  }

  const publicFile = publicStaticFiles.get(requestPath);
  if (!publicFile) {
    res.writeHead(404, withSecurityHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
    res.end("Not found");
    return;
  }

  const resolved = path.join(rootDir, publicFile);
  fs.readFile(resolved, (error, content) => {
    if (error) {
      res.writeHead(404, withSecurityHeaders({ "Content-Type": "text/plain; charset=utf-8" }));
      res.end("Not found");
      return;
    }
    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, withSecurityHeaders({ "Content-Type": mimeTypes[ext] || "application/octet-stream" }));
    res.end(req.method === "HEAD" ? undefined : content);
  });
}

const server = http.createServer(async (req, res) => {
  res.giveTakeRequest = req;
  try {
    if (req.url.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }
    serveStatic(req, res);
  } catch (error) {
    sendUnexpectedError(req, res, error);
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
