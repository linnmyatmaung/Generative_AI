import { generateReply } from "../service/chat.service.js";

export const chatController = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await generateReply(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error from Groq AI:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
