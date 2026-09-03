import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

declare global {
  var __cmsDb: Database.Database | undefined;
}

function openDb(): Database.Database {
  const dataDir = path.join(process.cwd(), ".data");
  mkdirSync(dataDir, { recursive: true });

  const db = new Database(path.join(dataDir, "cms.db"));
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS content_blocks (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  return db;
}

// Cache on globalThis so Turbopack's dev-mode HMR doesn't reopen the file
// (and accumulate handles) on every module reload.
const db = global.__cmsDb ?? openDb();
if (process.env.NODE_ENV !== "production") {
  global.__cmsDb = db;
}

export function getContentBlock<T>(key: string, seed: T): T {
  const row = db
    .prepare("SELECT value FROM content_blocks WHERE key = ?")
    .get(key) as { value: string } | undefined;

  if (!row) return seed;

  try {
    return JSON.parse(row.value) as T;
  } catch {
    return seed;
  }
}

export function hasContentBlock(key: string): boolean {
  const row = db.prepare("SELECT 1 FROM content_blocks WHERE key = ?").get(key);
  return row !== undefined;
}

export function setContentBlock(key: string, value: unknown): void {
  db.prepare(
    `INSERT INTO content_blocks (key, value, updated_at) VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  ).run(key, JSON.stringify(value), new Date().toISOString());
}
