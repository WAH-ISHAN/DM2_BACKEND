import { exec } from "../config/db";

type SavingRow = {
ID: number;
NAME: string;
TARGET: number;
CURR_AMOUNT?: number; // alias uppercase
CURRENT_AMOUNT?: number; // fallback if no alias
};

export class SavingModel {
static mapRow(x: SavingRow) {
return {
id: x.ID,
name: x.NAME,
target: x.TARGET,
current: (x as any).CURR_AMOUNT ?? (x as any).CURRENT_AMOUNT ?? 0,
};
}

static async list(userId: number) {
const sql =
"SELECT id, name, target, current_amount AS curr_amount " +
"FROM savings WHERE user_id = :u " +
"ORDER BY name";
const r = await exec(sql, { u: userId });
return (r.rows || []).map((x: any) => SavingModel.mapRow(x));
}

static async findById(userId: number, id: number) {
const sql =
"SELECT id, name, target, current_amount AS curr_amount " +
"FROM savings WHERE id = :id AND user_id = :u";
const r = await exec(sql, { id, u: userId });
const x = r.rows?.[0] as any;
return x ? SavingModel.mapRow(x) : null;
}

static async create(userId: number, name: string, target: number, current = 0) {
// Insert (no RETURNING to avoid parser quirks)
await exec(
"INSERT INTO savings (user_id, name, target, current_amount) VALUES (:u, :n, :t, :c)",
{ u: userId, n: name, t: target, c: current },
{ autoCommit: true }
);



// Read back the latest row for that user
const sel =
  "SELECT id, name, target, current_amount AS curr_amount " +
  "FROM savings WHERE user_id = :u " +
  "ORDER BY id DESC FETCH FIRST 1 ROWS ONLY";
const r = await exec(sel, { u: userId });
const x = r.rows?.[0] as any;
return x ? SavingModel.mapRow(x) : null;
}

static async update(
userId: number,
id: number,
payload: { name?: string; target?: number; current?: number }
) {
const sets: string[] = [];
const binds: any = { u: userId, id };



if (payload.name !== undefined) { sets.push("name = :name"); binds.name = payload.name; }
if (payload.target !== undefined) { sets.push("target = :target"); binds.target = payload.target; }
if (payload.current !== undefined) { sets.push("current_amount = :current"); binds.current = payload.current; }

if (!sets.length) return null;

const sql =
  `UPDATE savings SET ${sets.join(", ")}, updated_at = SYSTIMESTAMP ` +
  `WHERE id = :id AND user_id = :u`;
await exec(sql, binds, { autoCommit: true });

return this.findById(userId, id);
}

static async delete(userId: number, id: number) {
await exec(
"DELETE FROM savings WHERE id = :id AND user_id = :u",
{ id, u: userId },
{ autoCommit: true }
);
}
}