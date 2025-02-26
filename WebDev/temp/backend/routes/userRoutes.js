import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
      });
      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  }
);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found:", email);
        return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("Entered Password:", password);
      console.log("Stored Hashed Password:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Error logging in", error });
    }
  }
);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin Only)
 * @access  Private (Admin)
 */
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by ID
 * @access  Private
 */
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update user details
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Private (Admin)
 */
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

export default router;
