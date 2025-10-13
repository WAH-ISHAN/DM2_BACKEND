"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const budgets_routes_1 = __importDefault(require("./budgets.routes"));
const expenses_routes_1 = __importDefault(require("./expenses.routes"));
const savings_routes_1 = __importDefault(require("./savings.routes"));
const reports_routes_1 = __importDefault(require("./reports.routes"));
const api = (0, express_1.Router)();
api.use("/auth", auth_routes_1.default);
api.use("/budgets", budgets_routes_1.default);
api.use("/expenses", expenses_routes_1.default);
api.use("/savings", savings_routes_1.default);
api.use("/reports", reports_routes_1.default);
exports.default = api;
