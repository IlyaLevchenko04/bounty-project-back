import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  generateToken,
} from "../services/authService";

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
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
