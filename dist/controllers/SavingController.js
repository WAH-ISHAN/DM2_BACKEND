"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingController = void 0;
const SavingService_1 = require("../services/SavingService");
class SavingController {
    static list(req, res) {
        const u = req.userId;
        return SavingService_1.SavingService.list(u).then(rows => res.json(rows));
    }
    static async create(req, res) {
        const u = req.userId;
        const { name, target, current = 0 } = req.body || {};
        if (!name || target == null)
            return res.status(400).json({ message: "Missing fields" });
        const created = await SavingService_1.SavingService.create(u, name, Number(target), Number(current));
        res.status(201).json(created);
    }
    static async update(req, res) {
        const u = req.userId;
        const id = Number(req.params.id);
        const updated = await SavingService_1.SavingService.update(u, id, req.body);
        if (!updated)
            return res.status(400).json({ message: "No fields to update" });
        res.json(updated);
    }
    static async remove(req, res) {
        const u = req.userId;
        const id = Number(req.params.id);
        await SavingService_1.SavingService.delete(u, id);
        res.json({ ok: true });
    }
}
exports.SavingController = SavingController;
