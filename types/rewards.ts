export type PointsTransactionType =
  | "earned_purchase"
  | "earned_review"
  | "redeemed"
  | "expired"
  | "adjusted";

export type RewardRedemptionStatus =
  | "pending"
  | "applied"
  | "cancelled";

export type PointsTransaction = {
  id: string;
  userId: string;
  type: PointsTransactionType;
  points: number;
  description?: string | null;
  orderId?: string | null;
  createdAt?: string;
};

export type Reward = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  pointsCost: number;
  isActive: boolean;
  createdAt?: string;
};
