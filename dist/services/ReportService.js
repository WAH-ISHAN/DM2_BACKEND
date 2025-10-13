"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const ReportModel_1 = require("../models/ReportModel");
class ReportService {
    static async summary(userId) {
        const monthly = await ReportModel_1.ReportModel.monthly(userId);
        const rawCat = await ReportModel_1.ReportModel.byCategory(userId);
        const total = rawCat.reduce((s, x) => s + x.v, 0) || 1;
        const byCat = rawCat.map((x) => ({ ...x, pct: Math.round((x.v / total) * 100) }));
        const last3 = monthly.slice(-3).map(([, v]) => v);
        const forecast = last3.length ? Math.round(last3.reduce((s, x) => s + x, 0) / last3.length) : 0;
        return { monthly, byCat, forecast };
    }
}
exports.ReportService = ReportService;
