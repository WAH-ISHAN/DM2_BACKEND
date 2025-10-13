import { Request, Response } from "express";
import crypto from "crypto";
import { AuthService } from "../services/AuthService";
import { SessionModel } from "../middleware/SessionModel";

const COOKIE_NAME = "session";
const COOKIE_OPTS = {
httpOnly: true,
sameSite: "lax" as const,
secure: process.env.NODE_ENV === "production",
path: "/",
};

export class AuthController {
static async register(req: Request, res: Response) {
const { email, password } = req.body || {};
if (!email || !password) return res.status(400).json({ message: "Email and password required" });
const user = await AuthService.register(email, password);
if (!user) return res.status(400).json({ message: "User already exists" });
const token = crypto.randomBytes(32).toString("hex");
await SessionModel.create(token, user.id);
res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
res.status(201).json({ user });
}
static async login(req: Request, res: Response) {
const { email, password } = req.body || {};
const user = await AuthService.login(email, password);
if (!user) return res.status(401).json({ message: "Invalid credentials" });
const token = crypto.randomBytes(32).toString("hex");
await SessionModel.create(token, user.id);
res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
res.json({ user });
}
static async logout(req: Request, res: Response) {
const token = (req as any).cookies?.[COOKIE_NAME];
if (token) await SessionModel.deleteByToken(token);
res.clearCookie(COOKIE_NAME, COOKIE_OPTS as any);
res.json({ message: "Logged out" });
}
static async me(req: Request, res: Response) {
const token = (req as any).cookies?.[COOKIE_NAME];
if (!token) return res.status(401).json({ message: "Unauthorized" });
const userId = await SessionModel.getUserIdByToken(token);
if (!userId) return res.status(401).json({ message: "Unauthorized" });
const user = await AuthService.me(userId);
if (!user) return res.status(404).json({ message: "User not found" });
res.json({ user });
}
}