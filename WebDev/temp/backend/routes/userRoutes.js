import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

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
  registerUser
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
  loginUser
);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin Only)
 * @access  Private (Admin)
 */
router.get("/", authenticateToken, isAdmin, getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by ID
 * @access  Private (User or Admin)
 */
router.get("/:id", authenticateToken, async (req, res, next) => {
  // Allow users to access their own profile or admins to access any profile
  if (req.user._id.toString() === req.params.id || req.user.role === "admin") {
    return getUserById(req, res, next);
  }
  return res.status(403).json({ message: "Access denied." });
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update user details
 * @access  Private (User can update their own profile, Admin can update anyone)
 */
router.put(
  "/:id",
  authenticateToken,
  [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  ],
  async (req, res, next) => {
    // Allow users to update their own profile or admins to update any profile
    if (
      req.user._id.toString() === req.params.id ||
      req.user.role === "admin"
    ) {
      return updateUser(req, res, next);
    }
    return res.status(403).json({ message: "Access denied." });
  }
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user (Admin only, cannot delete self)
 * @access  Private (Admin)
 */
router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    return res
      .status(400)
      .json({ message: "Admins cannot delete themselves." });
  }
  deleteUser(req, res);
});

export default router;
