import { Router } from "express";
import auth from "./auth.routes";
import budgets from "./budgets.routes";
import expenses from "./expenses.routes";
import savings from "./savings.routes";
import reports from "./reports.routes";

const api = Router();
api.use("/auth", auth);
api.use("/budgets", budgets);
api.use("/expenses", expenses);
api.use("/savings", savings);
api.use("/reports", reports);
export default api;