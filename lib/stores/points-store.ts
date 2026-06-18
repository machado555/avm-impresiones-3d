import { createStore } from "@/lib/stores/store";
import type { PointsTransaction, Reward } from "@/types/rewards";

type PointsState = {
  balance: number;
  transactions: PointsTransaction[];
  rewards: Reward[];
  isLoading: boolean;
};

export const pointsStore = createStore<PointsState>({
  balance: 0,
  transactions: [],
  rewards: [],
  isLoading: false
});
