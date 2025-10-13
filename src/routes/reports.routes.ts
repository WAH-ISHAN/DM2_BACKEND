import { Router } from "express";
import { ReportController } from "../controllers/ReportController";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
const r = Router();
r.get("/", requireAuth, asyncHandler(ReportController.summary));
export default r;