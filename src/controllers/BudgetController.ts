import { Request, Response } from "express";
import { BudgetService } from "../services/BudgetService";

export class BudgetController {
static list(req: Request, res: Response) {
const u = (req as any).userId as number;
return BudgetService.list(u).then(rows => res.json(rows));
}
static async create(req: Request, res: Response) {
const u = (req as any).userId as number;
const { category, limit } = req.body || {};
if (!category || limit == null) return res.status(400).json({ message: "Missing fields" });
const created = await BudgetService.create(u, category, Number(limit));
res.status(201).json(created);
}
static async update(req: Request, res: Response) {
const u = (req as any).userId as number;
const id = Number(req.params.id);
const updated = await BudgetService.update(u, id, req.body || {});
res.json(updated || { ok: true });
}
static async remove(req: Request, res: Response) {
const u = (req as any).userId as number;
const id = Number(req.params.id);
await BudgetService.delete(u, id);
res.json({ ok: true });
}
}