"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = getPool;
exports.exec = exec;
const oracledb_1 = __importDefault(require("oracledb"));
const env_1 = require("./env");
oracledb_1.default.outFormat = oracledb_1.default.OUT_FORMAT_OBJECT;
let pool = null;
async function getPool() {
    if (!pool) {
        const connectString = `${env_1.env.dbHost}:${env_1.env.dbPort}/${env_1.env.dbServiceName}`;
        pool = await oracledb_1.default.createPool({
            user: env_1.env.dbUser,
            password: env_1.env.dbPassword,
            connectString,
            poolMin: 1,
            poolMax: 5,
            poolIncrement: 1,
        });
        console.log("✅ Oracle pool created:", connectString);
    }
    return pool;
}
async function exec(sql, binds = {}, opts = {}) {
    const conn = await (await getPool()).getConnection();
    try {
        const res = await conn.execute(sql, binds, opts);
        if (opts.autoCommit)
            await conn.commit();
        return res;
    }
    finally {
        await conn.close();
    }
}
