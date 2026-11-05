import express from "express";
import cors from "cors";
import "dotenv/config";
import { mySelf } from "./src/constant/data.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.post("/chat", async (req, res) => {
  const { message } = req.body ?? {};
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(503).json({ error: "OpenRouter API key is not configured" });
  }

  try {
    const messages = [
      {
        role: "system",
        content:
          "You are Linn Myat Maung. Respond in first person as Linn. Answer using the provided personal data; if the answer is not in the data, politely say you don't know. Keep a friendly, professional tone.",
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
      }),
    });
    const result = await response.json();

    if (!response.ok) {
      console.error("OpenRouter request failed:", result.error ?? response.status);
      return res.status(502).json({ error: "OpenRouter request failed" });
    }

    const reply = result.choices?.[0]?.message?.content;
    if (typeof reply !== "string") {
      return res.status(502).json({ error: "OpenRouter returned no reply" });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("OpenRouter request failed:", error);
    return res.status(502).json({ error: "OpenRouter request failed" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
