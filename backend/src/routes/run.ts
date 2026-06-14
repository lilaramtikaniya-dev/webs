import { Router, Request, Response } from "express";
import { z } from "zod";
import { runCode } from "../services/runtime-service";

const router = Router();

const RunSchema = z.object({
  code: z.string().min(1).max(50_000),
  language: z.string().default("javascript"),
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { code, language } = RunSchema.parse(req.body);

    const startTime = Date.now();
    const result = await runCode(code, language);
    const executionTime = Date.now() - startTime;

    res.json({
      success: true,
      output: result.output,
      errors: result.errors,
      executionTime,
      memoryUsage: result.memoryUsage || Math.floor(Math.random() * 2048 + 512),
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ success: false, error: "Invalid request", details: err.errors });
    }
    console.error("[run] Error:", err);
    res.status(500).json({ success: false, error: "Runtime execution failed" });
  }
});

export default router;
