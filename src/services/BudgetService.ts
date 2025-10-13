import { BudgetModel } from "../models/BudgetModel";
export class BudgetService {
static list(userId: number) { return BudgetModel.list(userId); }
static create(userId: number, category: string, limit: number) { return BudgetModel.create(userId, category, limit); }
static update(userId: number, id: number, data: any) { return BudgetModel.update(userId, id, data); }
static delete(userId: number, id: number) { return BudgetModel.delete(userId, id); }
}