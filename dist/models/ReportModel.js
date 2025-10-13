"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModel = void 0;
const db_1 = require("../config/db");
class ReportModel {
    static async monthly(userId) {
        const r = await (0, db_1.exec)(`SELECT TO_CHAR(TRUNC(txn_date,'MM'),'YYYY-MM') AS YM, SUM(amount) AS SUM_AMT FROM expenses WHERE user_id=:u GROUP BY TRUNC(txn_date,'MM') ORDER BY YM`, { u: userId });
        return (r.rows || []).map((x) => [x.YM, Number(x.SUM_AMT || 0)]);
    }
    static async byCategory(userId) {
        const r = await (0, db_1.exec)(`SELECT category AS CATEGORY, SUM(amount) AS SUM_AMT FROM expenses WHERE user_id=:u GROUP BY category ORDER BY SUM(amount) DESC`, { u: userId });
        return (r.rows || []).map((x) => ({ k: x.CATEGORY, v: Number(x.SUM_AMT || 0) }));
    }
}
exports.ReportModel = ReportModel;
