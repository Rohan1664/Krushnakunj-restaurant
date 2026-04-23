import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById); // ⭐ ADD THIS

// ADMIN
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct); // ⭐ ADD THIS
router.delete("/:id", protect, admin, deleteProduct);

export default router;