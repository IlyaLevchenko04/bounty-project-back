import { Router } from "express";
import { register, login, getUser } from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", authenticate, getUser);

export default router;
