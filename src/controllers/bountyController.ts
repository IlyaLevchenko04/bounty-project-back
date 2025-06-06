import { Request, Response } from "express";
import * as bountyService from "../services/bountyService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { Types } from "mongoose";
import { IBounty } from "../interfaces/Bounty";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const data: Omit<IBounty, "_id" | "createdAt" | "updatedAt"> = {
      ...req.body,
      postedBy: new Types.ObjectId(req.user?.id),
    };
    const bounty = await bountyService.createBounty(data);
    res.status(201).json(bounty);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const filter: {
      planet?: string;
      status?: "open" | "accepted" | "completed";
    } = {};
    if (req.query.planet) filter.planet = req.query.planet as string;
    if (req.query.status)
      filter.status = req.query.status as "open" | "accepted" | "completed";
    const bounties = await bountyService.getBounties(filter);
    res.json(bounties);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const accept = async (req: AuthRequest, res: Response) => {
  try {
    const bountyId = new Types.ObjectId(req.params.id);
    const userId = new Types.ObjectId(req.user?.id);
    const bounty = await bountyService.acceptBounty(bountyId, userId);
    res.json(bounty);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const myBounties = async (req: AuthRequest, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.user?.id);
    const bounties = await bountyService.getBountiesByUser(userId);
    res.json(bounties);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
