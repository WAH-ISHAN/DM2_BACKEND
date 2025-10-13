"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const ReportService_1 = require("../services/ReportService");
class ReportController {
    static async summary(req, res) {
        const u = req.userId;
        const data = await ReportService_1.ReportService.summary(u);
        res.json(data);
    }
}
exports.ReportController = ReportController;
