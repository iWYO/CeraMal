import "server-only";
import { Pool } from "pg";

const globalForPool = globalThis;

function needsSsl(url) {
  if (process.env.POSTGRES_SSL === "true") return true;
  if (process.env.POSTGRES_SSL === "false") return false;
  return url.includes("render.com") || url.includes("sslmode=require");
}

export function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!globalForPool.ceramalPgPool) {
    globalForPool.ceramalPgPool = new Pool({
      connectionString,
      max: 5,
      ssl: needsSsl(connectionString)
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }

  return globalForPool.ceramalPgPool;
}

function mapProductRow(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    description: row.description,
    imageUrl: row.image_url,
    category: row.category,
  };
}

export async function listProducts() {
  const pool = getPool();
  if (!pool) return [];

  const { rows } = await pool.query(
    `SELECT id, name, price, description, image_url, category
     FROM products
     ORDER BY sort_order ASC, name ASC`,
  );
  return rows.map(mapProductRow);
}

export async function getProductById(id) {
  const pool = getPool();
  if (!pool) return null;

  const { rows } = await pool.query(
    `SELECT id, name, price, description, image_url, category
     FROM products
     WHERE id = $1
     LIMIT 1`,
    [id],
  );
  return rows[0] ? mapProductRow(rows[0]) : null;
}
