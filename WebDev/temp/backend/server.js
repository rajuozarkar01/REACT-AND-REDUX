import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);

// Basic route to confirm server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

//login route, controller: user login, password verification, and JWT token generation
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb://pcgamedec2024:Starline%4012@starline-shard-00-00.sygqc.mongodb.net:27017,starline-shard-00-01.sygqc.mongodb.net:27017,starline-shard-00-02.sygqc.mongodb.net:27017/myDatabase?ssl=true&replicaSet=atlas-aio6pt-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));
