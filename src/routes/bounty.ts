import { Router } from "express";
import * as bountyController from "../controllers/bountyController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", bountyController.list);
router.post("/", authenticate, bountyController.create);
router.post("/:id/accept", authenticate, bountyController.accept);
router.get("/my", authenticate, bountyController.myBounties);

export default router;
