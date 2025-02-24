// routes/users.js
const express = require("express");
const { body, validationResult } = require("express-validator"); // ✅ Import express-validator
const {
  addUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserById, // ✅ Ensure this is correctly imported
} = require("../controllers/userController");

const router = express.Router();

// Middleware for validation errors
const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Routes
router.post("/", validateUser, addUser); // ✅ Add new user with validation
router.get("/", getUsers); // Fetch all users
router.delete("/:id", deleteUser); // Delete user by ID

// ✅ Fetch single user by ID using controller
router.get("/:id", getUserById);

// ✅ Update User (PUT/PATCH) with validation
router.put("/:id", validateUser, updateUser);
router.patch("/:id", validateUser, updateUser);

module.exports = router;

// controllers/userController.js
const mongoose = require("mongoose");
const User = require("../models/user");

// @desc Add new user
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding user", error: error.message });
  }
};

// @desc Fetch all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// ✅ @desc Fetch single user by ID
exports.getUserById = async (req, res) => {
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
};

// @desc Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// ✅ @desc Update user (PUT/PATCH)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};
