import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Middleware to authenticate token and attach user to request
 */
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fetch user details from DB (excluding password)
    const user = await User.findById(decoded._id || decoded.id).select(
      "-password"
    );
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token. User does not exist." });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    console.error("JWT Authentication Error:", error.message);

    let errorMessage = "Authentication failed.";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired. Please log in again.";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token.";
    }

    return res.status(403).json({ message: errorMessage });
  }
};

/**
 * Middleware to check if the user has an admin role
 */
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
