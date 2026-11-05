import express from "express";
import cors from "cors";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";
import { mySelf } from "./src/constant/data.js";
import { createReplyFormatter } from "./src/service/formatReply.js";
import { readOpenRouterStream } from "./src/service/readOpenRouterStream.js";

const app = express();
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again in a minute." },
});

app.post("/chat", chatLimiter, async (req, res) => {
  const { message } = req.body ?? {};
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "Message must be 2000 characters or fewer" });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(503).json({ error: "OpenRouter API key is not configured" });
  }

  try {
    const messages = [
      {
        role: "system",
        content:
          "You are Linn Myat Maung. Speak about yourself in first person and never refer to yourself as he or him. Answer from the provided profile and do not invent facts. Write plainly and naturally, without generic chatbot openings or closings, filler, inflated claims, forced lists, or unnecessary contrasts. Do not use bold Markdown or dash punctuation. Use commas or periods instead, but keep hyphens within words.",
      },
      {
        role: "system",
        content: `Personal data about Linn Myat Maung: ${JSON.stringify(mySelf)}`,
      },
      { role: "user", content: message },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:
          process.env.OPENROUTER_MODEL ||
          "nvidia/nemotron-3-ultra-550b-a55b:free",
        messages,
        max_tokens: 400,
        stream: true,
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      console.error("OpenRouter request failed:", result.error ?? response.status);
      return res.status(502).json({ error: "OpenRouter request failed" });
    }

    if (!response.body) {
      return res.status(502).json({ error: "OpenRouter returned no reply" });
    }

    const formatter = createReplyFormatter();
    res.status(200).set({
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    });
    let receivedDelta = false;

    for await (const chunk of readOpenRouterStream(response.body)) {
      receivedDelta = true;
      if (!res.headersSent) res.flushHeaders();
      const formatted = formatter.push(chunk);
      if (formatted) res.write(formatted);
    }

    if (!receivedDelta) {
      return res.status(502).json({ error: "OpenRouter returned no reply" });
    }

    const remaining = formatter.finish();
    if (remaining) res.write(remaining);
    return res.end();
  } catch (error) {
    console.error("OpenRouter request failed:", error);
    if (res.headersSent) return res.destroy(error);
    return res.status(502).json({ error: "OpenRouter request failed" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
