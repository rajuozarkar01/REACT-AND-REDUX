const express = require("express");
const { loginUser } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Public Route: Login (No authentication required)
router.post("/login", loginUser);

// ✅ Example Protected Route (If needed in the future)
// router.get("/protected-route", authenticateToken, (req, res) => {
//   res.json({ message: "You are authenticated!", user: req.user });
// });

module.exports = router;
