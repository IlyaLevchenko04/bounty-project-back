import { Router } from "express";
import authRouter from "./auth";
import bountyRouter from "./bounty";
import adminRouter from "./admin";

const router = Router();

router.use("/auth", authRouter);
router.use("/bounties", bountyRouter);
router.use("/admin", adminRouter);

router.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default router;
