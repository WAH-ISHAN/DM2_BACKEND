import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import api from "./routes/index";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error";

const app = express();
app.use(
cors({
origin: env.corsOrigin,
credentials: true,
methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
allowedHeaders: ["Content-Type", "Authorization"],
})
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", api);

app.get("/", (_req, res) => res.send("Server is running ✅"));
app.use(errorHandler);

app.listen(env.port, () => {
console.log(`✅ API on http://localhost:${env.port}`);
});