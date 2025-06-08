import User, { IUserDocument } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../interfaces/User";
import { Types } from "mongoose";

export const registerUser = async (
  username: string,
  password: string
): Promise<IUserDocument> => {
  const existing = await User.findOne({ username });
  if (existing) throw new Error("Username already exists");
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, role: "hunter" });
  await user.save();
  return user;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<IUserDocument> => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");
  return user;
};

export const generateToken = (user: IUserDocument): string => {
  if (!user._id) throw new Error("User ID is required");

  const payload: JWTPayload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
};
