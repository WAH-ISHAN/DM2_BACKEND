import { ExpenseModel } from "../models/ExpenseModel";
export class ExpenseService {
static list(userId: number) { return ExpenseModel.list(userId); }
static create(userId: number, payload: any) { return ExpenseModel.create(userId, payload); }
static update(userId: number, id: number, payload: any) { return ExpenseModel.update(userId, id, payload); }
static delete(userId: number, id: number) { return ExpenseModel.delete(userId, id); }
}