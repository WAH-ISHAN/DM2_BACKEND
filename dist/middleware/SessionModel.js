"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const db_1 = require("../config/db");
class SessionModel {
    static async create(token, userId) {
        await (0, db_1.exec)(`INSERT INTO app_sessions (token, user_id, expires_at) VALUES (:t, :u, SYSTIMESTAMP + NUMTODSINTERVAL(30,'DAY'))`, { t: token, u: userId }, { autoCommit: true });
    }
    static async deleteByToken(token) {
        await (0, db_1.exec)(`DELETE FROM app_sessions WHERE token=:t`, { t: token }, { autoCommit: true });
    }
    static async getUserIdByToken(token) {
        const r = await (0, db_1.exec)(`SELECT user_id FROM app_sessions WHERE token=:t AND expires_at > SYSTIMESTAMP`, { t: token });
        return r.rows?.[0]?.USER_ID || null;
    }
}
exports.SessionModel = SessionModel;
