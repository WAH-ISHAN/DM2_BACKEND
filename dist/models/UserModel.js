"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const db_1 = require("../config/db");
const oracledb_1 = __importDefault(require("oracledb"));
class UserModel {
    static async findByEmail(email) {
        const r = await (0, db_1.exec)(`SELECT id, email, password_hash FROM app_users WHERE LOWER(email)=LOWER(:e)`, { e: email });
        return r.rows?.[0] || null;
    }
    static async findPublicById(id) {
        const r = await (0, db_1.exec)(`SELECT id, email FROM app_users WHERE id=:id`, { id });
        return r.rows?.[0] || null;
    }
    static async create(email, password_hash) {
        const r = await (0, db_1.exec)(`INSERT INTO app_users (email, password_hash) VALUES (:e,:h) RETURNING id INTO :id`, { e: email, h: password_hash, id: { dir: oracledb_1.default.BIND_OUT, type: oracledb_1.default.NUMBER } }, { autoCommit: true });
        return r.outBinds?.id?.[0];
    }
}
exports.UserModel = UserModel;
