import { exec } from "../config/db";
import oracledb from "oracledb";

export class BudgetModel {
static async list(userId: number) {
const r = await exec(
`SELECT id, category, limit_amount AS "LIMIT", spent FROM budgets WHERE user_id=:u ORDER BY category`,
{ u: userId }
);
return (r.rows || []).map((x: any) => ({
id: x.ID, category: x.CATEGORY, limit: x.LIMIT, spent: x.SPENT
}));
}
static async create(userId: number, category: string, limit: number) {
const r = await exec(
`INSERT INTO budgets (user_id, category, limit_amount, spent) VALUES (:u,:c,:l,0) RETURNING id INTO :id`,
{ u: userId, c: category, l: limit, id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } },
{ autoCommit: true }
);
const id = (r.outBinds as any).id[0];
const sel = await exec(
`SELECT id, category, limit_amount AS "LIMIT", spent FROM budgets WHERE id=:id AND user_id=:u`,
{ id, u: userId }
);
const x = sel.rows?.[0] as any;
return x ? { id: x.ID, category: x.CATEGORY, limit: x.LIMIT, spent: x.SPENT } : null;
}
static async update(userId: number, id: number, data: { category?: string; limit?: number; spent?: number }) {
const sets: string[] = [];
const binds: any = { id, u: userId };
if (data.category !== undefined) { sets.push("category=:category"); binds.category = data.category; }
if (data.limit !== undefined) { sets.push("limit_amount=:limit"); binds.limit = data.limit; }
if (data.spent !== undefined) { sets.push("spent=:spent"); binds.spent = data.spent; }
if (!sets.length) return null;
await exec(`UPDATE budgets SET ${sets.join(", ")}, updated_at=SYSTIMESTAMP WHERE id=:id AND user_id=:u`, binds, { autoCommit: true });
const r = await exec(
`SELECT id, category, limit_amount AS "LIMIT", spent FROM budgets WHERE id=:id AND user_id=:u`,
{ id, u: userId }
);
const x = r.rows?.[0] as any;
return x ? { id: x.ID, category: x.CATEGORY, limit: x.LIMIT, spent: x.SPENT } : null;
}
static async delete(userId: number, id: number) {
await exec(`DELETE FROM budgets WHERE id=:id AND user_id=:u`, { id, u: userId }, { autoCommit: true });
}
}