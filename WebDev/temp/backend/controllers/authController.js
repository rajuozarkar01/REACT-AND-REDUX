import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// Generate Tokens
const generateAccessToken = (user) => {
  console.log("🔑 Generating Access Token...");
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  console.log("🔄 Generating Refresh Token...");
  return jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Login Function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔍 Checking user:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found!");
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password!");
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Debug logs for token generation
    console.log("🔄 Generated Access Token:", accessToken);
    console.log("🔄 Generated Refresh Token:", refreshToken);

    // Store refresh token in DB
    user.refreshToken = refreshToken;

    // Debug log before saving
    console.log("📝 Saving user with refresh token...");
    console.log("📝 User object before saving:", JSON.stringify(user, null, 2));

    // Try-catch block for user.save()
    try {
      await user.save();
      console.log("✅ User saved with refresh token:", refreshToken);
    } catch (saveError) {
      console.error("❌ Error saving user:", saveError);
    }

    // Debug log after saving
    const updatedUser = await User.findOne({ email });
    console.log("✅ User saved with refresh token:", updatedUser.refreshToken);

    res.json({ success: true, accessToken, refreshToken });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Refresh Token Handler
export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  console.log("🔄 Received refreshToken:", refreshToken);

  if (!refreshToken) {
    console.log("❌ No refresh token provided!");
    return res
      .status(401)
      .json({ success: false, message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log("✅ Refresh token decoded:", decoded);

    const user = await User.findById(decoded._id);
    if (!user) {
      console.log("❌ User not found for refresh token");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.refreshToken !== refreshToken) {
      console.log("❌ Refresh token mismatch!");
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);
    console.log("✅ New access token generated:", newAccessToken);

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error("❌ Refresh token error:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
};

// ✅ Logout Function
export const logout = async (req, res) => {
  try {
    console.log("🔐 Logging out user...");
    const user = await User.findById(req.user._id);

    if (!user) {
      console.log("❌ User not found during logout!");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.refreshToken = null; // Remove refresh token
    await user.save();

    console.log("✅ Logout successful!");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
