"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlite = void 0;
exports.all = all;
exports.get = get;
exports.run = run;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const DEFAULT_PATH = node_path_1.default.resolve(process.cwd(), process.env.SQLITE_PATH || "data/finance_local.db");
// Directory ensure
node_fs_1.default.mkdirSync(node_path_1.default.dirname(DEFAULT_PATH), { recursive: true });
exports.sqlite = (() => {
    const db = new better_sqlite3_1.default(DEFAULT_PATH, { verbose: undefined }); // remove verbose if noisy
    // Pragmas (match DB Browser settings)
    db.pragma("foreign_keys = ON");
    db.pragma("journal_mode = WAL");
    db.pragma("synchronous = NORMAL");
    return db;
})();
// Small helpers
function all(sql, params = []) {
    return exports.sqlite.prepare(sql).all(...params);
}
function get(sql, params = []) {
    return exports.sqlite.prepare(sql).get(...params);
}
function run(sql, params = []) {
    return exports.sqlite.prepare(sql).run(...params);
}
