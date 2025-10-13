import oracledb from "oracledb";
import { env } from "./env";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool: oracledb.Pool | null = null;

export async function getPool() {
if (!pool) {
const connectString = `${env.dbHost}:${env.dbPort}/${env.dbServiceName}`;
pool = await oracledb.createPool({
user: env.dbUser,
password: env.dbPassword,
connectString,
poolMin: 1,
poolMax: 5,
poolIncrement: 1,
});
console.log("✅ Oracle pool created:", connectString);
}
return pool!;
}

export async function exec<T = any>(
sql: string,
binds: oracledb.BindParameters = {},
opts: oracledb.ExecuteOptions & { autoCommit?: boolean } = {}
) {
const conn = await (await getPool()).getConnection();
try {
const res = await conn.execute<T>(sql, binds, opts);
if (opts.autoCommit) await conn.commit();
return res;
} finally {
await conn.close();
}
}