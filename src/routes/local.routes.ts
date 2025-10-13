import { Router } from "express";
import { all, run } from "../localdb/sqlite";

const r = Router();

r.get("/budgets", (req, res) => {
const rows = all(
`SELECT id, category, limit_amount AS "limit", spent FROM budgets WHERE user_id = 1 AND is_deleted = 0 ORDER BY category`
);
res.json(rows);
});

r.post("/budgets", (req, res) => {
const { category, limit } = req.body || {};
if (!category || limit == null) return res.status(400).json({ message: "Missing fields" });
run(
`INSERT INTO budgets (user_id, category, limit_amount, spent, guid) VALUES (1, ?, ?, 0, lower(hex(randomblob(16))))`,
[category, Number(limit)]
);
const row = all(
`SELECT id, category, limit_amount AS "limit", spent FROM budgets WHERE user_id=1 AND category=? ORDER BY id DESC LIMIT 1`,
[category]
)[0];
res.status(201).json(row);
});

export default r;