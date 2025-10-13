"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const ExpenseService_1 = require("../services/ExpenseService");
class ExpenseController {
    static list(req, res) {
        const u = req.userId;
        return ExpenseService_1.ExpenseService.list(u).then(rows => res.json(rows));
    }
    static async create(req, res) {
        const u = req.userId;
        const { date, category, amount } = req.body || {};
        if (!date || !category || amount == null)
            return res.status(400).json({ message: "Missing fields" });
        const created = await ExpenseService_1.ExpenseService.create(u, req.body);
        res.status(201).json(created);
    }
    static async update(req, res) {
        const u = req.userId;
        const id = Number(req.params.id);
        const updated = await ExpenseService_1.ExpenseService.update(u, id, req.body);
        res.json(updated || { ok: true });
    }
    static async remove(req, res) {
        const u = req.userId;
        const id = Number(req.params.id);
        await ExpenseService_1.ExpenseService.delete(u, id);
        res.json({ ok: true });
    }
}
exports.ExpenseController = ExpenseController;
