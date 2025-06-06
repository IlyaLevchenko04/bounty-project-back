export interface IBounty {
  _id?: string;
  title: string;
  description: string;
  targetName: string;
  planet: string;
  reward: number;
  status: "open" | "accepted" | "completed";
  imageUrl?: string;
  postedBy: string; // user id
  acceptedBy?: string; // user id
}
