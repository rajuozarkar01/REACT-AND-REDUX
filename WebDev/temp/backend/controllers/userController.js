import mongoose from "mongoose"; // ✅ Import mongoose
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

import Activity from "../models/activityModel.js"; // Ensure correct path

export const getRecentActivities = async (req, res) => {
  console.log("🛠️ Checking req.user in getRecentActivities:", req.user);

  if (!req.user || !req.user._id) {
    console.error("❌ ERROR: req.user is undefined or missing _id");
    return res
      .status(400)
      .json({ message: "Authentication error: User not found." });
  }

  try {
    const activities = await Activity.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    if (!activities.length) {
      console.warn("⚠️ No activities found for user:", req.user._id);
      return res.status(404).json({ message: "No recent activities found." });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("❌ Error fetching recent activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

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

    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Return user object along with token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const login = async (req, res) => {
  console.log("🔹 Login function called"); // Debugging log

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ User authenticated:", user.email);

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    console.log("🔑 Access Token:", token);
    console.log("🔄 Refresh Token:", refreshToken);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      refreshToken,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get user by ID or current authenticated user
 * @route   GET /api/users/:id
 * @access  Private (User/Admin)
 */
export const getUserById = async (req, res) => {
  try {
    let userId = req.params.id;

    // ✅ If the client requests "me", fetch the logged-in user's data
    if (userId === "me") {
      userId = req.user._id; // Extract from authenticated user
    }

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private (Admin)
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

/**
 * @desc    Update user details
 * @route   PUT /api/users/:id
 * @access  Private (Admin or User updating own profile)
 */
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      req.user._id.toString() !== user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

/**
 * @route   POST /api/users/logout
 * @desc    Logout user (clears refresh token)
 * @access  Private (Authenticated users only)
 */
export const logout = async (req, res) => {
  try {
    // Clear refresh token (if stored in DB)
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.refreshToken = null; // Clear stored refresh token
    await user.save();

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc    Delete a user (Admin only, cannot delete self)
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user._id.toString() === user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Admins cannot delete themselves." });
    }

    await user.deleteOne(); // ✅ `deleteOne` instead of `remove()` (deprecated)
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
