import { Request, Response } from "express";
import { ReportService } from "../services/ReportService";

export class ReportController {
static async summary(req: Request, res: Response) {
const u = (req as any).userId as number;
const data = await ReportService.summary(u);
res.json(data);
}
}