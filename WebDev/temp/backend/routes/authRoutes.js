import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js"; // ✅ Fixed middleware name
import {
  login,
  logout,
  refreshAccessToken,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", authenticateToken, logout); // ✅ Using correct middleware

export default router;
