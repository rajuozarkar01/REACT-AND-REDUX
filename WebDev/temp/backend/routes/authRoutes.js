const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res
      .status(403)
      .json({ success: false, message: "Refresh Token required" });

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Find user with refresh token
    const user = await User.findOne({ _id: decoded._id, refreshToken });
    if (!user)
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });

    // Generate new access token
    const accessToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ success: true, accessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
});

module.exports = router;
