import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  role: "hunter" | "admin";
  acceptedBounties: Types.ObjectId[];
  postedBounties: Types.ObjectId[];
}

export interface JWTPayload {
  id: Types.ObjectId;
  username: string;
  role: "hunter" | "admin";
}
