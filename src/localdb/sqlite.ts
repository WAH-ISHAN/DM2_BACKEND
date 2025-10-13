
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const DEFAULT_PATH = path.resolve(process.cwd(), process.env.SQLITE_PATH || "data/finance_local.db");

// Directory ensure
fs.mkdirSync(path.dirname(DEFAULT_PATH), { recursive: true });

export const sqlite = (() => {
const db = new Database(DEFAULT_PATH, { verbose: undefined }); // remove verbose if noisy
// Pragmas (match DB Browser settings)
db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");
db.pragma("synchronous = NORMAL");
return db;
})();

// Small helpers
export function all<T = any>(sql: string, params: any[] = []): T[] {
return sqlite.prepare(sql).all(...params) as T[];
}
export function get<T = any>(sql: string, params: any[] = []): T | undefined {
return sqlite.prepare(sql).get(...params) as T | undefined;
}
export function run(sql: string, params: any[] = []) {
return sqlite.prepare(sql).run(...params);
}