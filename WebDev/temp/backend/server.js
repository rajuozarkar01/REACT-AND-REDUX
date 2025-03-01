import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // ✅ Added Order Routes

dotenv.config();
const app = express();

// ✅ Middleware Setup
app.use(express.json()); // Ensure JSON request parsing
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Allow frontend access

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes); // ✅ Register Order Routes

// ✅ Database Connection
const MONGO_URI = process.env.MONGO_URI
  .replace("${MONGO_USER}", encodeURIComponent(process.env.MONGO_USER))
  .replace("${MONGO_PASSWORD}", encodeURIComponent(process.env.MONGO_PASSWORD));

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Default Route (For API Testing)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
