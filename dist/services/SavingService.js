"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingService = void 0;
const SavingModel_1 = require("../models/SavingModel");
class SavingService {
    static list(userId) { return SavingModel_1.SavingModel.list(userId); }
    static create(userId, name, target, current = 0) { return SavingModel_1.SavingModel.create(userId, name, target, current); }
    static update(userId, id, payload) { return SavingModel_1.SavingModel.update(userId, id, payload); }
    static delete(userId, id) { return SavingModel_1.SavingModel.delete(userId, id); }
}
exports.SavingService = SavingService;
