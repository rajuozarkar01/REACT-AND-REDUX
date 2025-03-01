import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Ensure this path is correct

export const authenticateToken = async (req, res, next) => {
  try {
    console.log("🔹 Incoming Request - Headers:", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("⚠️ No token provided in request headers.");
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔍 Extracted Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 Decoded JWT:", decoded);

    // Fetch user from database
    const user = await User.findById(decoded._id).select("_id name role");
    if (!user) {
      console.warn("⚠️ Token is valid, but user not found in DB.");
      return res
        .status(401)
        .json({ message: "Invalid token. User does not exist." });
    }

    // Attach user to request
    req.user = { _id: user._id, name: user.name, role: user.role };

    // NEW DEBUGGING LOG
    console.log("✅ req.user SET SUCCESSFULLY:", req.user);

    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error);

    let errorMessage = "Authentication failed.";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired. Please log in again.";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token.";
    }

    return res.status(403).json({ message: errorMessage });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  console.log("🔍 Checking Admin Role Middleware:", req.user.role); // Add this
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
