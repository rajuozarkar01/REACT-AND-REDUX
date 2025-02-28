import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json()); // Ensure JSON parsing is enabled
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
const MONGO_URI = "mongodb://pcgamedec2024:Starline%4012@starline-shard-00-00.sygqc.mongodb.net:27017,starline-shard-00-01.sygqc.mongodb.net:27017,starline-shard-00-02.sygqc.mongodb.net:27017/myDatabase?ssl=true&replicaSet=atlas-aio6pt-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));