import mongoose, { Schema, Document } from "mongoose";
import { IBounty } from "../interfaces/Bounty";

// Remove _id from IBounty when extending Document
type BountyDocument = Omit<IBounty, "_id"> & Document;

export interface IBountyDocument extends BountyDocument {
  _id: mongoose.Types.ObjectId;
}

const BountySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetName: { type: String, required: true },
    planet: { type: String, required: true },
    reward: { type: Number, required: true },
    status: {
      type: String,
      enum: ["open", "accepted", "completed"],
      default: "open",
    },
    imageUrl: { type: String },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    acceptedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IBountyDocument>("Bounty", BountySchema);
