import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Public Route: Login
router.post("/login", loginUser);

export default router;

// ✅ Example Protected Route (If needed in the future)
// router.get("/protected-route", authenticateToken, (req, res) => {
//   res.json({ message: "You are authenticated!", user: req.user });
// });
