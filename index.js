import express from "express";
import cors from "cors";
import chatRoutes from "./src/routes/chat.route.js";
import serverless from "serverless-http";

const app = express();
app.use(cors());
app.use(express.json());
app.use(chatRoutes);

if (process.env.ENV === "local") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

const handleRequest = serverless(app);

export const handler = async (event, context) => {
  return await handleRequest(event, context);
};
