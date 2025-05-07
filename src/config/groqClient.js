import { Groq } from "groq-sdk";
import { config } from "dotenv";

// Load environment variables
config();

const apiKey = process.env.GROQ_API_KEY; // GROQ_API_KEY

const client = new Groq({
  apiKey,
});

export default client;
