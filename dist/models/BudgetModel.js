"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetModel = void 0;
const db_1 = require("../config/db");
const oracledb_1 = __importDefault(require("oracledb"));
class BudgetModel {
    static async list(userId) {
        const r = await (0, db_1.exec)(`SELECT id, category, limit_amount AS "LIMIT", spent FROM budgets WHERE user_id=:u ORDER BY category`, { u: userId });
        return (r.rows || []).map((x) => ({
            id: x.ID, category: x.CATEGORY, limit: x.LIMIT, spent: x.SPENT
        }));
    }
    static async create(userId, category, limit) {
        const r = await (0, db_1.exec)(`INSERT INTO budgets (user_id, category, limit_amount, spent) VALUES (:u,:c,:l,0) RETURNING id INTO :id`, { u: userId, c: category, l: limit, id: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER } }, { autoCommit: true });
        const id = r.outBinds.id[0];
        const sel = await (0, db_1.exec)(`SELECT id, category, limit_amount AS "LIMIT", spent FROM budgets WHERE id=:id AND user_id=:u`, { id, u: userId });
        const x = sel.rows?.[0];
        return x ? { id: x.ID, category: x.CATEGORY, limit: x.LIMIT, spent: x.SPENT } : null;
    }
    static async update(userId, id, data) {
        const sets = [];
        const binds = { id, u: userId };
        if (data.category !== undefined) {
            sets.push("category=:category");
            binds.category = data.category;
        }
        if (data.limit !== undefined) {
            sets.push("limit_amount=:limit");
            binds.limit = data.limit;
        }
        if (data.spent !== undefined) {
            sets.push("spent=:spent");
            binds.spent = data.spent;
        }
        if (!sets.length)
            return null;
        await (0, db_1.exec)(`UPDATE budgets SET ${sets.join(", ")}, updated_at=SYSTIMESTAMP WHERE id=:id AND user_id=:u`, binds, { autoCommit: true });
        const r = await (0, db_1.exec)(`SELECT id, category, limit_amount AS "LIMIT", spent FROM budgets WHERE id=:id AND user_id=:u`, { id, u: userId });
        const x = r.rows?.[0];
        return x ? { id: x.ID, category: x.CATEGORY, limit: x.LIMIT, spent: x.SPENT } : null;
    }
    static async delete(userId, id) {
        await (0, db_1.exec)(`DELETE FROM budgets WHERE id=:id AND user_id=:u`, { id, u: userId }, { autoCommit: true });
    }
}
exports.BudgetModel = BudgetModel;
