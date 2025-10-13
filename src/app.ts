import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error";
import { env } from "./config/env";

export const app = express();

// --- middlewares ---
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ Proper CORS setup
app.use(cors({
  origin: env.corsOrigin || "http://localhost:5173", // match your frontend
  credentials: true, // allow cookies/sessions
}));

// ✅ Handle OPTIONS preflight requests
app.options("*", cors({
  origin: env.corsOrigin || "http://localhost:5173",
  credentials: true,
}));

// --- routes ---
app.use("/api/auth", authRoutes);

// --- global error handler ---
app.use(errorHandler);

// --- test route (optional) ---
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});
