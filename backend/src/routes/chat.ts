import { Router, Request, Response } from "express";
import { z } from "zod";
import OpenAI from "openai";

const router = Router();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const ChatSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
  systemPrompt: z.string().optional(),
  stream: z.boolean().default(true),
});

const DEFAULT_SYSTEM = `You are Runtime Mentor, an expert AI assistant for JSForge Runtime — a JavaScript interpreter built in C++. You are friendly, technical, and educational. Always format your responses with markdown. Use code blocks with language tags.`;

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages, systemPrompt, stream } = ChatSchema.parse(req.body);

    const systemContent = systemPrompt || DEFAULT_SYSTEM;

    if (stream) {
      // Set SSE headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      res.flushHeaders();

      const streamResponse = await client.chat.completions.create({
        model: "gpt-4o-mini",
        stream: true,
        max_tokens: 1500,
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
      });

      for await (const chunk of streamResponse) {
        const data = JSON.stringify(chunk);
        res.write(`data: ${data}\n\n`);
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } else {
      // Non-streaming
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 1500,
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
      });

      res.json({
        success: true,
        message: response.choices[0]?.message?.content || "",
        usage: response.usage,
      });
    }
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ success: false, error: "Invalid request", details: err.errors });
    }
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: "AI service error" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
      res.end();
    }
    console.error("[chat] Error:", err);
  }
});

export default router;
