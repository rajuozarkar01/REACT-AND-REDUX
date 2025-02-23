const express = require("express");
const {
  addUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const User = require("../models/user"); // ✅ Correct path

const router = express.Router();

router.post("/", addUser); // Add new user
router.get("/", getUsers); // Fetch all users
router.delete("/:id", deleteUser); // Delete user by ID

// GET /api/users/:id → Fetch a single user by ID
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

module.exports = router;
