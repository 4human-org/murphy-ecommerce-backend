import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
} from "../controllers/users.mjs";

const router = express.Router();

// Define Route for fetching all items
router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

router.patch("/users/:id", updateUser);

// Export the router
export default router;