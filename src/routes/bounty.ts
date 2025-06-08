import { Router, Request, Response } from "express";
import * as bountyController from "../controllers/bountyController";
import { authenticate } from "../middlewares/authMiddleware";

const router: Router = Router();

router.get("/", bountyController.list);
router.post("/", authenticate, bountyController.create);
router.get("/my", authenticate, bountyController.myBounties);
router.get("/:id", bountyController.getBountyById);
router.post("/:id/accept", authenticate, bountyController.accept);

export default router;
