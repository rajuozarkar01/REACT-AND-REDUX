import express from "express";
import { loginUser } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public Route: Login (No authentication required)
router.post("/login", loginUser);

// ✅ Example Protected Route (If needed in the future)
// router.get("/protected-route", authenticateToken, (req, res) => {
//   res.json({ message: "You are authenticated!", user: req.user });
// });

export default router;
