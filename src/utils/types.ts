export type User = { id: number; email: string; password_hash?: string };
export type Session = { token: string; user_id: number; expires_at: Date | string };
export type Budget = { id: number; user_id: number; category: string; limit: number; spent: number };
export type Expense = { id: number; user_id: number; date: string; category: string; description: string; amount: number };
export type Saving = { id: number; user_id: number; name: string; target: number; current: number };
export type ReportSummary = { monthly: [string, number][]; byCat: { k: string; v: number; pct: number }[]; forecast: number };