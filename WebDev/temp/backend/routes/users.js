import express from "express";
import {
  getUsers, // Corrected function name
  addUser,
  deleteUser,
} from "../controllers/userController.js"; // Named imports

const router = express.Router();

// @route   GET /api/users
router.get("/", getUsers);

// @route   POST /api/users
router.post("/", addUser);

// @route   DELETE /api/users/:id
router.delete("/:id", deleteUser);

export default router;
