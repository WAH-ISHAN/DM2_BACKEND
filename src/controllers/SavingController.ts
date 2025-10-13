import { Request, Response } from "express";
import { SavingService } from "../services/SavingService";

export class SavingController {
static list(req: Request, res: Response) {
const u = (req as any).userId as number;
return SavingService.list(u).then(rows => res.json(rows));
}
static async create(req: Request, res: Response) {
const u = (req as any).userId as number;
const { name, target, current = 0 } = req.body || {};
if (!name || target == null) return res.status(400).json({ message: "Missing fields" });
const created = await SavingService.create(u, name, Number(target), Number(current));
res.status(201).json(created);
}
static async update(req: Request, res: Response) {
const u = (req as any).userId as number;
const id = Number(req.params.id);
const updated = await SavingService.update(u, id, req.body);
if (!updated) return res.status(400).json({ message: "No fields to update" });
res.json(updated);
}
static async remove(req: Request, res: Response) {
const u = (req as any).userId as number;
const id = Number(req.params.id);
await SavingService.delete(u, id);
res.json({ ok: true });
}
}