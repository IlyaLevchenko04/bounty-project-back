import { Response } from "express";
import { AuthRequest } from "@middlewares/authMiddleware";
import * as adminService from "@services/adminService";
import { Types } from "mongoose";

export const getAllUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await adminService.getAllUsersWithBounties();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserRole = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["hunter", "admin"].includes(role)) {
      res.status(400).json({ error: "Invalid role" });
      return;
    }

    const user = await adminService.updateUserRole(
      new Types.ObjectId(userId),
      role as "hunter" | "admin"
    );
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await adminService.deleteUser(new Types.ObjectId(userId));
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
