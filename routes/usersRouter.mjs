import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from '../controllers/users.mjs';
import { checkAuth, checkAdmin } from '../middleware/userAuth.js'; 

const router = express.Router();

// Apply checkAuth middleware to all routes
router.use(checkAuth);

// Define routes for fetching necessary user informaiton
router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

// Apply checkAdmin middleware to delete and update routes
router.delete('/users/:id', checkAdmin, deleteUser);

router.patch('/users/:id', checkAdmin, updateUser);

export default router;