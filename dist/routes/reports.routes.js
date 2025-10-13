"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReportController_1 = require("../controllers/ReportController");
const auth_1 = require("../middleware/auth");
const asyncHandler_1 = require("../middleware/asyncHandler");
const r = (0, express_1.Router)();
r.get("/", auth_1.requireAuth, (0, asyncHandler_1.asyncHandler)(ReportController_1.ReportController.summary));
exports.default = r;
