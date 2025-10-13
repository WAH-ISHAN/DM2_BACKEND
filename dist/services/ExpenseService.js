"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const ExpenseModel_1 = require("../models/ExpenseModel");
class ExpenseService {
    static list(userId) { return ExpenseModel_1.ExpenseModel.list(userId); }
    static create(userId, payload) { return ExpenseModel_1.ExpenseModel.create(userId, payload); }
    static update(userId, id, payload) { return ExpenseModel_1.ExpenseModel.update(userId, id, payload); }
    static delete(userId, id) { return ExpenseModel_1.ExpenseModel.delete(userId, id); }
}
exports.ExpenseService = ExpenseService;
