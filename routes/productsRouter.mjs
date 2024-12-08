import express from "express";
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/products.mjs";
import { checkAuth } from '../middleware/userAuth.js'; 

const router = express.Router();

router.use(checkAuth);
// Define Route for fetching all items
router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

// Also want to check if user is admin for these
router.post("/products", checkAdmin, createProduct);

router.delete("/products/:id", checkAdmin, deleteProduct);

router.patch("/products/:id", checkAdmin, updateProduct);

// Export the router
export default router;
