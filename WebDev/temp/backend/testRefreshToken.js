import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Replace with a valid refresh token from your API response
const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JlZWFjMjIyODYzNWFkYWFmYTQyMTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDA5MTEyNDQsImV4cCI6MTc0MDkxNDg0NH0.dKVA3rTBbydSHEduX38tbIvwNW1awilEPVDtO9gd8No";

try {
    console.log("🔄 Verifying Refresh Token...");
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log("✅ Decoded Refresh Token:", decoded);

    // Generate a new access token
    const newAccessToken = jwt.sign(
        { _id: decoded._id, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );

    console.log("🔄 New Access Token:", newAccessToken);
} catch (error) {
    console.error("❌ Token refresh error:", error.message);
}
