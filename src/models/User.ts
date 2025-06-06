import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/User";

// Remove _id from IUser when extending Document
type UserDocument = Omit<IUser, "_id"> & Document;

export interface IUserDocument extends UserDocument {
  _id: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["hunter", "admin"], default: "hunter" },
  acceptedBounties: [{ type: Schema.Types.ObjectId, ref: "Bounty" }],
  postedBounties: [{ type: Schema.Types.ObjectId, ref: "Bounty" }],
});

export default mongoose.model<IUserDocument>("User", UserSchema);
