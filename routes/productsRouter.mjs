import express from "express";
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/products.mjs";

const router = express.Router();

// Define Route for fetching all items
router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", createProduct);

router.delete("/products/:id", deleteProduct);

router.patch("/products/:id", updateProduct);

// Export the router
export default router;
