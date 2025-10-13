"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const AuthService_1 = require("../services/AuthService");
const SessionModel_1 = require("../middleware/SessionModel");
const COOKIE_NAME = "session";
const COOKIE_OPTS = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
};
class AuthController {
    static async register(req, res) {
        const { email, password } = req.body || {};
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });
        const user = await AuthService_1.AuthService.register(email, password);
        if (!user)
            return res.status(400).json({ message: "User already exists" });
        const token = crypto_1.default.randomBytes(32).toString("hex");
        await SessionModel_1.SessionModel.create(token, user.id);
        res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
        res.status(201).json({ user });
    }
    static async login(req, res) {
        const { email, password } = req.body || {};
        const user = await AuthService_1.AuthService.login(email, password);
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = crypto_1.default.randomBytes(32).toString("hex");
        await SessionModel_1.SessionModel.create(token, user.id);
        res.cookie(COOKIE_NAME, token, COOKIE_OPTS);
        res.json({ user });
    }
    static async logout(req, res) {
        const token = req.cookies?.[COOKIE_NAME];
        if (token)
            await SessionModel_1.SessionModel.deleteByToken(token);
        res.clearCookie(COOKIE_NAME, COOKIE_OPTS);
        res.json({ message: "Logged out" });
    }
    static async me(req, res) {
        const token = req.cookies?.[COOKIE_NAME];
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const userId = await SessionModel_1.SessionModel.getUserIdByToken(token);
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const user = await AuthService_1.AuthService.me(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ user });
    }
}
exports.AuthController = AuthController;
