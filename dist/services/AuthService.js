"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = require("../models/UserModel");
class AuthService {
    static async register(email, password) {
        const exists = await UserModel_1.UserModel.findByEmail(email);
        if (exists)
            return null;
        const hash = await bcryptjs_1.default.hash(password, 10);
        const id = await UserModel_1.UserModel.create(email.toLowerCase(), hash);
        return { id, email: email.toLowerCase() };
    }
    static async login(email, password) {
        const row = await UserModel_1.UserModel.findByEmail(email.toLowerCase());
        if (!row)
            return null;
        const ok = await bcryptjs_1.default.compare(password, row.PASSWORD_HASH);
        if (!ok)
            return null;
        return { id: row.ID, email: row.EMAIL };
    }
    static async me(id) {
        const row = await UserModel_1.UserModel.findPublicById(id);
        return row ? { id: row.ID, email: row.EMAIL } : null;
    }
}
exports.AuthService = AuthService;
