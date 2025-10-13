import { exec } from "../config/db";
import oracledb from "oracledb";

export class UserModel {
static async findByEmail(email: string) {
const r = await exec<{ ID: number; EMAIL: string; PASSWORD_HASH: string }>(
`SELECT id, email, password_hash FROM app_users WHERE LOWER(email)=LOWER(:e)`,
{ e: email }
);
return r.rows?.[0] || null;
}
static async findPublicById(id: number) {
const r = await exec<{ ID: number; EMAIL: string }>(
`SELECT id, email FROM app_users WHERE id=:id`,
{ id }
);
return r.rows?.[0] || null;
}
static async create(email: string, password_hash: string) {
const r = await exec(
`INSERT INTO app_users (email, password_hash) VALUES (:e,:h) RETURNING id INTO :id`,
{ e: email, h: password_hash, id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } },
{ autoCommit: true }
);
return (r.outBinds as any)?.id?.[0] as number;
}
}