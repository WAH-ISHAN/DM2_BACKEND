import { ReportModel } from "../models/ReportModel";
export class ReportService {
static async summary(userId: number) {
const monthly = await ReportModel.monthly(userId);
const rawCat = await ReportModel.byCategory(userId);
const total = rawCat.reduce((s: number, x: { v: number }) => s + x.v, 0) || 1;
const byCat = rawCat.map((x: { v: number } & Record<string, any>) => ({ ...x, pct: Math.round((x.v / total) * 100) }));
const last3 = monthly.slice(-3).map(([, v]) => v);
const forecast = last3.length ? Math.round(last3.reduce((s, x) => s + x, 0) / last3.length) : 0;
return { monthly, byCat, forecast };
}
}