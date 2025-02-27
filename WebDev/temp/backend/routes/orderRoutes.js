import express from "express";
import Order from "../models/Order.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create a new order (Protected - Only authenticated users)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, user: req.user._id });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all orders (Protected - Admin only)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("service");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a single order by ID (Protected - Only the order owner or admin)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("service");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Allow only admin or the order owner to access
    if (req.user.role !== "admin" && order.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update order status (Protected - Admin only)
router.put("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete an order (Protected - Admin only)
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
