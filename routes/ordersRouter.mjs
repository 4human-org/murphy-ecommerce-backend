import express from "express";
import {
  getAllOrders,
  getOrderById,
  deleteOrder,
  createOrder,
  updateOrder,
} from "../controllers/orders.mjs";

const router = express.Router();

// Define Route for fetching all items
router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);

router.post("/orders", createOrder);

router.delete("/orders/:id", deleteOrder);

router.patch("/orders/:id", updateOrder);

// Export the router
export default router;