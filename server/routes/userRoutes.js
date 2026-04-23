import express from "express";
import {
  getUsers,
  deleteUser,
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users (Admin)
router.get("/", protect, admin, getUsers);

// Delete user (Admin)
router.delete("/:id", protect, admin, deleteUser);

export default router;