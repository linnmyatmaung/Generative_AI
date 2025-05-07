import express from "express";
import cors from "cors";
import chatRoutes from "./src/routes/chat.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(chatRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
