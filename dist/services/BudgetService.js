"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetService = void 0;
const BudgetModel_1 = require("../models/BudgetModel");
class BudgetService {
    static list(userId) { return BudgetModel_1.BudgetModel.list(userId); }
    static create(userId, category, limit) { return BudgetModel_1.BudgetModel.create(userId, category, limit); }
    static update(userId, id, data) { return BudgetModel_1.BudgetModel.update(userId, id, data); }
    static delete(userId, id) { return BudgetModel_1.BudgetModel.delete(userId, id); }
}
exports.BudgetService = BudgetService;
