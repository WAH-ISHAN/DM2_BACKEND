import { Request, Response, NextFunction } from "express";
import { SessionModel } from "../middleware/SessionModel";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
try {
const token = (req as any).cookies?.session;
if (!token) return res.status(401).json({ message: "Unauthorized" });
const userId = await SessionModel.getUserIdByToken(token);
if (!userId) return res.status(401).json({ message: "Unauthorized" });
(req as any).userId = userId;
next();
} catch (e) { next(e); }
}