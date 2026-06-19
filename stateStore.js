const fs = require("fs");
const path = require("path");
const { createSeed } = require("./seed");

const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const dbPath = path.join(dataDir, "give-take-db.json");
const stateId = "give-and-take";
const databaseUrl = process.env.DATABASE_URL || "";
let pool = null;

function usingPostgres() {
  return Boolean(databaseUrl);
}

function getStorageInfo() {
  return {
    mode: usingPostgres() ? "supabase-postgres" : "local-json",
    stateId
  };
}

function getPool() {
  if (!pool) {
    const { Pool } = require("pg");
    pool = new Pool({
      connectionString: databaseUrl,
      connectionTimeoutMillis: Number(process.env.DB_CONNECT_TIMEOUT_MS || 10000),
      query_timeout: Number(process.env.DB_QUERY_TIMEOUT_MS || 15000),
      ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false }
    });
  }
  return pool;
}

function mergeCatalogProducts(currentProducts = [], seedProducts = []) {
  const currentProductsById = new Map(currentProducts.map(product => [product.id, product]));
  const seedProductIds = new Set(seedProducts.map(product => product.id));
  const migratedSeedProducts = seedProducts.map(seedProduct => {
    const currentProduct = currentProductsById.get(seedProduct.id);
    if (!currentProduct) return seedProduct;
    return {
      ...seedProduct,
      ...currentProduct,
      // Catalog-owned classification follows the new seed while live inventory
      // fields such as price, status, and quantity remain untouched.
      category: seedProduct.category
    };
  });
  const customProducts = currentProducts
    .filter(product => !seedProductIds.has(product.id))
    .map(product => product.category === "furniture" ? { ...product, category: "home" } : product);
  return [...migratedSeedProducts, ...customProducts];
}

function applyCatalogVersion(db) {
  const seed = createSeed();
  if (db.meta?.catalogVersion === seed.meta.catalogVersion) return { db, changed: false };
  const currentProducts = Array.isArray(db.products) ? db.products : [];
  const nextDb = {
    ...db,
    meta: {
      ...db.meta,
      catalogVersion: seed.meta.catalogVersion,
      updatedAt: new Date().toISOString()
    },
    categories: seed.categories,
    products: mergeCatalogProducts(currentProducts, seed.products)
  };
  return { db: nextDb, changed: true };
}

async function ensureLocalDb() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify(createSeed(), null, 2));
  const current = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  const synced = applyCatalogVersion(current);
  if (synced.changed) fs.writeFileSync(dbPath, JSON.stringify(synced.db, null, 2));
}

async function ensurePostgresDb() {
  const client = getPool();
  await client.query(`
    create table if not exists app_state (
      id text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )
  `);
  const existing = await client.query("select id from app_state where id = $1", [stateId]);
  if (!existing.rowCount) {
    await client.query(
      "insert into app_state (id, data, updated_at) values ($1, $2::jsonb, now())",
      [stateId, JSON.stringify(createSeed())]
    );
    return;
  }
  const current = await client.query("select data from app_state where id = $1", [stateId]);
  const synced = applyCatalogVersion(current.rows[0].data);
  if (synced.changed) {
    await client.query(
      "update app_state set data = $2::jsonb, updated_at = now() where id = $1",
      [stateId, JSON.stringify(synced.db)]
    );
  }
}

async function ensureDb() {
  if (usingPostgres()) {
    await ensurePostgresDb();
    return;
  }
  await ensureLocalDb();
}

async function readDb() {
  await ensureDb();
  if (usingPostgres()) {
    const result = await getPool().query("select data from app_state where id = $1", [stateId]);
    return result.rows[0].data;
  }
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

async function writeDb(db) {
  db.meta.updatedAt = new Date().toISOString();
  if (usingPostgres()) {
    await getPool().query(
      "insert into app_state (id, data, updated_at) values ($1, $2::jsonb, now()) on conflict (id) do update set data = excluded.data, updated_at = now()",
      [stateId, JSON.stringify(db)]
    );
    return;
  }
  await ensureLocalDb();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

module.exports = { ensureDb, readDb, writeDb, getStorageInfo, mergeCatalogProducts };
