import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  generateToken,
  getUserById,
} from "../services/authService";
import { Types } from "mongoose";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await registerUser(username, password);
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    const token = generateToken(user);
    res.json({ token, user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ data: user });
  } catch (err: any) {
    if (err.name === "CastError") {
      res.status(400).json({ error: "Invalid user ID format" });
      return;
    }
    res.status(500).json({ error: err.message });
  }
};
