"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
function req(name, fallback) {
    const v = process.env[name] ?? fallback;
    if (v == null)
        throw new Error(`Missing env ${name}`);
    return v;
}
exports.env = {
    port: Number(process.env.PORT || 4000),
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
    dbUser: req("DB_USER"),
    dbPassword: req("DB_PASSWORD"),
    dbHost: req("DB_HOST"),
    dbPort: req("DB_PORT"),
    dbServiceName: process.env.DB_SERVICE_NAME || process.env.DB_SID || "XE",
    nodeEnv: process.env.NODE_ENV || "development",
};
