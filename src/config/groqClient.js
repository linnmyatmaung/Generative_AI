import { Groq } from "groq-sdk";
import { config } from "dotenv";

// Load environment variables
config();

const apiKey = process.env.GROQ_API_KEY; // 👈 Make sure it's GROQ_API_KEY

const client = new Groq({
  apiKey,
});

export default client;
