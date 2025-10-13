import { Request, Response } from "express";
import { ExpenseService } from "../services/ExpenseService";

export class ExpenseController {
static list(req: Request, res: Response) {
const u = (req as any).userId as number;
return ExpenseService.list(u).then(rows => res.json(rows));
}
static async create(req: Request, res: Response) {
const u = (req as any).userId as number;
const { date, category, amount } = req.body || {};
if (!date || !category || amount == null) return res.status(400).json({ message: "Missing fields" });
const created = await ExpenseService.create(u, req.body);
res.status(201).json(created);
}
static async update(req: Request, res: Response) {
const u = (req as any).userId as number;
const id = Number(req.params.id);
const updated = await ExpenseService.update(u, id, req.body);
res.json(updated || { ok: true });
}
static async remove(req: Request, res: Response) {
const u = (req as any).userId as number;
const id = Number(req.params.id);
await ExpenseService.delete(u, id);
res.json({ ok: true });
}
}