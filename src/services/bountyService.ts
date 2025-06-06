import Bounty, { IBountyDocument } from "../models/Bounty";
import User from "../models/User";
import { Types } from "mongoose";
import { IBounty } from "../interfaces/Bounty";

interface BountyFilter {
  planet?: string;
  status?: "open" | "accepted" | "completed";
}

export const createBounty = async (
  data: Omit<IBounty, "_id" | "createdAt" | "updatedAt">
) => {
  const bounty = new Bounty(data);
  await bounty.save();
  await User.findByIdAndUpdate(data.postedBy, {
    $push: { postedBounties: bounty._id },
  });
  return bounty;
};

export const getBounties = async (filter: BountyFilter = {}) => {
  return Bounty.find(filter)
    .populate("postedBy", "username")
    .populate("acceptedBy", "username");
};

export const getBountyById = async (id: Types.ObjectId) => {
  return Bounty.findById(id)
    .populate("postedBy", "username")
    .populate("acceptedBy", "username");
};

export const acceptBounty = async (
  bountyId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const bounty = await Bounty.findById(bountyId);
  if (!bounty) throw new Error("Bounty not found");
  if (bounty.status !== "open")
    throw new Error("Bounty already accepted or completed");
  bounty.status = "accepted";
  bounty.acceptedBy = userId.toString();
  await bounty.save();
  await User.findByIdAndUpdate(userId, {
    $push: { acceptedBounties: bounty._id },
  });
  return bounty;
};

export const getBountiesByUser = async (userId: Types.ObjectId) => {
  return Bounty.find({ $or: [{ postedBy: userId }, { acceptedBy: userId }] });
};
