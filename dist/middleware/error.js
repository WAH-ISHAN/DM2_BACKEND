"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    console.error("🔥 FULL ERROR OBJECT:", err); // 👈 Add this line
    console.error("🔥 Error message:", err?.message || err);
    res.status(err?.status || 500).json({ message: err?.message || "Internal Server Error" });
}
