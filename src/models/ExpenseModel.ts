import { exec } from "../config/db";
import oracledb from "oracledb";

export class ExpenseModel {
  // --------------------  LIST  --------------------
  static async list(userId: number) {
    const sql = "SELECT id, TO_CHAR(txn_date,'YYYY-MM-DD') AS \"date\", category, description, amount " +
                "FROM expenses WHERE user_id = :u " +
                "ORDER BY txn_date DESC, id DESC";

    const r = await exec(sql, { u: userId });

    return (r.rows || []).map((x: any) => ({
      id: x.ID,
      date: x.DATE,
      category: x.CATEGORY,
      description: x.DESCRIPTION,
      amount: x.AMOUNT
    }));
  }

  // --------------------  CREATE  --------------------
  static async create(
    userId: number,
    payload: { date: string; category: string; description?: string; amount: number }
  ) {
    // 1️⃣ Insert row
    await exec(
      "INSERT INTO expenses (user_id, txn_date, category, description, amount) " +
      "VALUES (:u, TO_DATE(:dt,'YYYY-MM-DD'), :c, :d, :a)",
      {
        u: userId,
        dt: payload.date,
        c: payload.category,
        d: payload.description ?? null,
        a: payload.amount
      },
      { autoCommit: true }
    );

    // 2️⃣ Select latest inserted row for that user
    const res = await exec(
      "SELECT * FROM (" +
      "  SELECT id, TO_CHAR(txn_date,'YYYY-MM-DD') AS \"date\", category, description, amount " +
      "  FROM expenses WHERE user_id = :u ORDER BY id DESC" +
      ") WHERE ROWNUM = 1",
      { u: userId }
    );

    const x = res.rows?.[0] as any;
    return x
      ? {
          id: x.ID,
          date: x.DATE,
          category: x.CATEGORY,
          description: x.DESCRIPTION,
          amount: x.AMOUNT
        }
      : null;
  }

  // --------------------  UPDATE  --------------------
  static async update(
    userId: number,
    id: number,
    payload: { date?: string; category?: string; description?: string; amount?: number }
  ) {
    const sets: string[] = [];
    const binds: any = { id, u: userId };

    if (payload.date !== undefined) {
      sets.push("txn_date = TO_DATE(:dt,'YYYY-MM-DD')");
      binds.dt = payload.date;
    }
    if (payload.category !== undefined) {
      sets.push("category = :c");
      binds.c = payload.category;
    }
    if (payload.description !== undefined) {
      sets.push("description = :d");
      binds.d = payload.description ?? null;
    }
    if (payload.amount !== undefined) {
      sets.push("amount = :a");
      binds.a = payload.amount;
    }

    if (!sets.length) return null;

    const sql = `UPDATE expenses
                   SET ${sets.join(", ")},
                       updated_at = SYSTIMESTAMP
                 WHERE id = :id AND user_id = :u`;

    await exec(sql, binds, { autoCommit: true });
    return this.findById(userId, id);
  }

  // --------------------  DELETE  --------------------
  static async delete(userId: number, id: number) {
    await exec(
      "DELETE FROM expenses WHERE id = :id AND user_id = :u",
      { id, u: userId },
      { autoCommit: true }
    );
  }

  // --------------------  FIND ONE  --------------------
  static async findById(userId: number, id: number) {
    const sql = "SELECT id, TO_CHAR(txn_date,'YYYY-MM-DD') AS \"date\", category, description, amount " +
                "FROM expenses WHERE id = :id AND user_id = :u";

    const r = await exec(sql, { id, u: userId });

    const x = r.rows?.[0] as any;
    return x
      ? {
          id: x.ID,
          date: x.DATE,
          category: x.CATEGORY,
          description: x.DESCRIPTION,
          amount: x.AMOUNT
        }
      : null;
  }
}
