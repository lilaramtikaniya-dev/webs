import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import runRouter from "./routes/run";
import chatRouter from "./routes/chat";
import leaderboardRouter from "./routes/leaderboard";
import healthRouter from "./routes/health";
import { errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));

// Logging
app.use(morgan("combined"));

// Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Global rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// AI route rate limit (stricter)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: "Too many AI requests per minute. Please wait." },
});

// Routes
app.use("/health", healthRouter);
app.use("/run", runRouter);
app.use("/chat", aiLimiter, chatRouter);
app.use("/leaderboard", leaderboardRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n🚀 JSForge Runtime API running on port ${PORT}`);
  console.log(`   Health:      http://localhost:${PORT}/health`);
  console.log(`   Run:         http://localhost:${PORT}/run`);
  console.log(`   Chat:        http://localhost:${PORT}/chat`);
  console.log(`   Leaderboard: http://localhost:${PORT}/leaderboard\n`);
});

export default app;
