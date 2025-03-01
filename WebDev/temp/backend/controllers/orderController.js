import Order from "../models/Order.js";
import Activity from "../models/activityModel.js"; // ✅ Ensure you have this model

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, user: req.user._id });
    await newOrder.save();

    // ✅ Log Activity
    await new Activity({
      userId: req.user._id,
      action: "Order Created",
      details: `Order #${newOrder._id} was placed.`,
    }).save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("service");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
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
};

// Update order status
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    // ✅ Log Activity
    await new Activity({
      userId: req.user._id,
      action: "Order Updated",
      details: `Order #${updatedOrder._id} was updated.`,
    }).save();

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    // ✅ Log Activity
    await new Activity({
      userId: req.user._id,
      action: "Order Deleted",
      details: `Order #${req.params.id} was deleted.`,
    }).save();

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
