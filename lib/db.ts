import "server-only";
import mysql, { type Pool } from "mysql2/promise";

let pool: Pool | undefined;

export function getDatabasePool(): Pool {
  if (pool) return pool;

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  const port = Number(DB_PORT || "3306");
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Database configuration is incomplete or invalid.");
  }

  pool = mysql.createPool({
    host: DB_HOST,
    port,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    charset: "utf8mb4",
  });
  return pool;
}
