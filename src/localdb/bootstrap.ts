import { run } from "./sqlite";

export function bootstrapSqlite() {
run("PRAGMA foreign_keys = ON");
run("CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE )");
// budgets/expenses/savings create IF NOT EXISTS (oya Part B wala dapu CREATE statements tika paste karanna)
// optional seed: run("INSERT OR IGNORE INTO users (id,email) VALUES (1,'local@user')");
}

