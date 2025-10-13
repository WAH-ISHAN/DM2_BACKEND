"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const error_1 = require("./middleware/error");
const env_1 = require("./config/env");
exports.app = (0, express_1.default)();
// --- middlewares ---
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
// ✅ Proper CORS setup
exports.app.use((0, cors_1.default)({
    origin: env_1.env.corsOrigin || "http://localhost:5173", // match your frontend
    credentials: true, // allow cookies/sessions
}));
// ✅ Handle OPTIONS preflight requests
exports.app.options("*", (0, cors_1.default)({
    origin: env_1.env.corsOrigin || "http://localhost:5173",
    credentials: true,
}));
// --- routes ---
exports.app.use("/api/auth", auth_routes_1.default);
// --- global error handler ---
exports.app.use(error_1.errorHandler);
// --- test route (optional) ---
exports.app.get("/", (req, res) => {
    res.send("Server is running ✅");
});
