import { Response, NextFunction, RequestHandler } from "express";
import { AuthRequest } from "./authMiddleware";

export const isAdmin: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  next();
};
