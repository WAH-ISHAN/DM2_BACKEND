"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const SessionModel_1 = require("../middleware/SessionModel");
async function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.session;
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const userId = await SessionModel_1.SessionModel.getUserIdByToken(token);
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        req.userId = userId;
        next();
    }
    catch (e) {
        next(e);
    }
}
