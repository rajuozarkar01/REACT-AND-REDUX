const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Adjust path if needed

// @route   GET /api/users
// @desc    Get all users
router.get("/api/users", userController.getAllUsers);

// @route   POST /api/users
// @desc    Add new user
router.post("/api/users", userController.addUser);

// @route   DELETE /api/users/:id
// @desc    Delete user by ID
router.delete("/api/users/:id", userController.deleteUser);

module.exports = router;
