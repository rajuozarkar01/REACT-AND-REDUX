import express from "express";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";
import { canEditUser } from "../middleware/canEditUser.js"; // ✅ New Middleware
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getRecentActivities,
} from "../controllers/userController.js";

const router = express.Router();

/** ===========================
 *  📌 ADMIN ROUTES (PRIVATE)
 *  =========================== */

/**
 * @route   GET /api/users/activities
 * @desc    Get recent activities (Admin Only)
 * @access  Private (Admin)
 */
router.get("/activities", authenticateToken, isAdmin, getRecentActivities);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin Only)
 * @access  Private (Admin)
 */
router.get("/", authenticateToken, isAdmin, getUsers);

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

/** ===========================
 *  📌 AUTHENTICATION ROUTES (PUBLIC)
 *  =========================== */

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

/** ===========================
 *  📌 USER ROUTES (PRIVATE)
 *  =========================== */

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by ID
 * @access  Private (User or Admin)
 */
router.get("/:id", authenticateToken, async (req, res, next) => {
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
  canEditUser, // ✅ Middleware handles access control
  [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  ],
  updateUser
);

export default router;
