import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error("🔥 FULL ERROR OBJECT:", err);    // 👈 Add this line
  console.error("🔥 Error message:", err?.message || err);
  res.status(err?.status || 500).json({ message: err?.message || "Internal Server Error" });
}