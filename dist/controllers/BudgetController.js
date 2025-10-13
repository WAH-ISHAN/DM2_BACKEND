"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const BudgetService_1 = require("../services/BudgetService");
class BudgetController {
    static list(req, res) {
        const u = req.userId;
        return BudgetService_1.BudgetService.list(u).then(rows => res.json(rows));
    }
    static async create(req, res) {
        const u = req.userId;
        const { category, limit } = req.body || {};
        if (!category || limit == null)
            return res.status(400).json({ message: "Missing fields" });
        const created = await BudgetService_1.BudgetService.create(u, category, Number(limit));
        res.status(201).json(created);
    }
    static async update(req, res) {
        const u = req.userId;
        const id = Number(req.params.id);
        const updated = await BudgetService_1.BudgetService.update(u, id, req.body || {});
        res.json(updated || { ok: true });
    }
    static async remove(req, res) {
        const u = req.userId;
        const id = Number(req.params.id);
        await BudgetService_1.BudgetService.delete(u, id);
        res.json({ ok: true });
    }
}
exports.BudgetController = BudgetController;
