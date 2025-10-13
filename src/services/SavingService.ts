import { SavingModel } from "../models/SavingModel";
export class SavingService {
static list(userId: number) { return SavingModel.list(userId); }
static create(userId: number, name: string, target: number, current = 0) { return SavingModel.create(userId, name, target, current); }
static update(userId: number, id: number, payload: any) { return SavingModel.update(userId, id, payload); }
static delete(userId: number, id: number) { return SavingModel.delete(userId, id); }
}