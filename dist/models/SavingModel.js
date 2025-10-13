"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingModel = void 0;
const db_1 = require("../config/db");
class SavingModel {
    static async list(userId) {
        const sql = "SELECT id, name, target, current_amount AS curr_amount " +
            "FROM savings WHERE user_id = :u " +
            "ORDER BY name";
        const r = await (0, db_1.exec)(sql, { u: userId });
        return (r.rows || []).map((x) => ({
            id: x.ID,
            name: x.NAME,
            target: x.TARGET,
            current: x.CURR_AMOUNT, // alias changed
        }));
    }
    static async create(userId, name, target, current = 0) {
        await (0, db_1.exec)("INSERT INTO savings (user_id, name, target, current_amount) VALUES (:u, :n, :t, :c)", { u: userId, n: name, t: target, c: current }, { autoCommit: true });
        const sel = "SELECT id, name, target, current_amount AS curr_amount " +
            "FROM savings WHERE user_id = :u " +
            "ORDER BY id DESC FETCH FIRST 1 ROWS ONLY";
        const r = await (0, db_1.exec)(sel, { u: userId });
        const x = r.rows?.[0];
        return x
            ? { id: x.ID, name: x.NAME, target: x.TARGET, current: x.CURR_AMOUNT }
            : null;
    }
    static async update(userId, id, payload) {
        const sets = [];
        const binds = { u: userId, id };
        if (payload.name !== undefined) {
            sets.push("name = :name");
            binds.name = payload.name;
        }
        if (payload.target !== undefined) {
            sets.push("target = :target");
            binds.target = payload.target;
        }
        if (payload.current !== undefined) {
            sets.push("current_amount = :current");
            binds.current = payload.current;
        }
        if (!sets.length)
            return null;
        const sql = `UPDATE savings SET ${sets.join(", ")}, updated_at = SYSTIMESTAMP ` +
            `WHERE id = :id AND user_id = :u`;
        await (0, db_1.exec)(sql, binds, { autoCommit: true });
        const r = await (0, db_1.exec)("SELECT id, name, target, current_amount AS curr_amount " +
            "FROM savings WHERE id = :id AND user_id = :u", { id, u: userId });
        const x = r.rows?.[0];
        return x
            ? { id: x.ID, name: x.NAME, target: x.TARGET, current: x.CURR_AMOUNT }
            : null;
    }
    static async delete(userId, id) {
        await (0, db_1.exec)("DELETE FROM savings WHERE id = :id AND user_id = :u", { id, u: userId }, { autoCommit: true });
    }
}
exports.SavingModel = SavingModel;
