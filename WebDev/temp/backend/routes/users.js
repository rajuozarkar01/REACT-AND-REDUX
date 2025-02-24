const express = require("express");
const {
  addUser,
  getUsers,
  deleteUser,
  updateUser, // ✅ Added updateUser
} = require("../controllers/userController");
const User = require("../models/user");

const router = express.Router();

// Routes
router.post("/", addUser); // Add new user
router.get("/", getUsers); // Fetch all users
router.delete("/:id", deleteUser); // Delete user by ID

// Fetch single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// ✅ Update User (PUT for full update, PATCH for partial)
router.put("/:id", updateUser); // Full update
router.patch("/:id", updateUser); // Partial update

module.exports = router;
