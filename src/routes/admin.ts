import { Router } from "express";
import * as adminController from "../controllers/adminController";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/adminMiddleware";

const router = Router();

// All admin routes require authentication and admin role
router.use("/", authenticate, isAdmin);

// Get all users with their bounties
router.get("/users", adminController.getAllUsers);

// Update user role
router.patch("/users/:userId/role", adminController.updateUserRole);

// Delete user and their bounties
router.delete("/users/:userId", adminController.deleteUser);

export default router;
