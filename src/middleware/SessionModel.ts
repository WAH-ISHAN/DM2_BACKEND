import { exec } from "../config/db";

export class SessionModel {
static async create(token: string, userId: number) {
await exec(
`INSERT INTO app_sessions (token, user_id, expires_at) VALUES (:t, :u, SYSTIMESTAMP + NUMTODSINTERVAL(30,'DAY'))`,
{ t: token, u: userId },
{ autoCommit: true }
);
}
static async deleteByToken(token: string) {
await exec(`DELETE FROM app_sessions WHERE token=:t`, { t: token }, { autoCommit: true });
}
static async getUserIdByToken(token: string) {
const r = await exec<{ USER_ID: number }>(
`SELECT user_id FROM app_sessions WHERE token=:t AND expires_at > SYSTIMESTAMP`,
{ t: token }
);
return r.rows?.[0]?.USER_ID || null;
}
}