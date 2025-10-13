import { exec } from "../config/db";
export class ReportModel {
static async monthly(userId: number) {
const r = await exec<{ YM: string; SUM_AMT: number }>(
`SELECT TO_CHAR(TRUNC(txn_date,'MM'),'YYYY-MM') AS YM, SUM(amount) AS SUM_AMT FROM expenses WHERE user_id=:u GROUP BY TRUNC(txn_date,'MM') ORDER BY YM`,
{ u: userId }
);
return (r.rows || []).map((x: any) => [x.YM, Number(x.SUM_AMT || 0)]) as [string, number][];
}
static async byCategory(userId: number) {
const r = await exec<{ CATEGORY: string; SUM_AMT: number }>(
`SELECT category AS CATEGORY, SUM(amount) AS SUM_AMT FROM expenses WHERE user_id=:u GROUP BY category ORDER BY SUM(amount) DESC`,
{ u: userId }
);
return (r.rows || []).map((x: any) => ({ k: x.CATEGORY, v: Number(x.SUM_AMT || 0) }));
}
}
