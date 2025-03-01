import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js"; // ✅ Import controller functions
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create a new order (Protected - Only authenticated users)
router.post("/", authenticateToken, createOrder);

// ✅ Get all orders (Protected - Admin only)
router.get("/", authenticateToken, isAdmin, getOrders);

// ✅ Get a single order by ID (Protected - Only the order owner or admin)
router.get("/:id", authenticateToken, getOrderById);

// ✅ Update order status (Protected - Admin only)
router.put("/:id", authenticateToken, isAdmin, updateOrder);

// ✅ Delete an order (Protected - Admin only)
router.delete("/:id", authenticateToken, isAdmin, deleteOrder);

export default router;
