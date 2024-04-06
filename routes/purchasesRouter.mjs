import express from "express";
import {
  getPurchaseById,
  deletePurchase,
  createPurchase,
  updatePurchase,
} from "../controllers/purchases.mjs";

const router = express.Router();

// Define Route for fetching all items
router.get("/purchases/:id", getPurchaseById);

router.post("/purchases", createPurchase);

router.delete("/purchases/:id", deletePurchase);

router.patch("/purchases/:id", updatePurchase);

// Export the router
export default router;