import User, { IUserDocument } from "@models/User";
import Bounty from "@models/Bounty";
import { Types } from "mongoose";

interface BountyDetails {
  _id: Types.ObjectId;
  title: string;
  status: string;
}

interface UserWithBounties {
  _id: Types.ObjectId;
  username: string;
  role: "hunter" | "admin";
  postedBountiesDetails: BountyDetails[];
  acceptedBountiesDetails: BountyDetails[];
}

export const getAllUsersWithBounties = async (): Promise<
  UserWithBounties[]
> => {
  const users = await User.find().select("-password").lean();

  const usersWithBounties = await Promise.all(
    users.map(async (user) => {
      const postedBounties = await Bounty.find({ postedBy: user._id })
        .select("title status")
        .lean();

      const acceptedBounties = await Bounty.find({ acceptedBy: user._id })
        .select("title status")
        .lean();

      return {
        _id: user._id,
        username: user.username,
        role: user.role,
        postedBountiesDetails: postedBounties,
        acceptedBountiesDetails: acceptedBounties,
      };
    })
  );

  return usersWithBounties;
};

export const updateUserRole = async (
  userId: Types.ObjectId,
  newRole: "hunter" | "admin"
): Promise<IUserDocument> => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const deleteUser = async (userId: Types.ObjectId): Promise<void> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Delete all bounties posted by the user
  await Bounty.deleteMany({ postedBy: userId });

  // Remove user from accepted bounties
  await Bounty.updateMany(
    { acceptedBy: userId },
    { $unset: { acceptedBy: 1 }, status: "open" }
  );

  await user.deleteOne();
};
