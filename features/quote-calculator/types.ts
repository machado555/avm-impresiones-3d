export type ManualQuoteInput = {
  materialCost: number;
  laborCost: number;
  machineCost: number;
  marginPercentage: number;
};

export type ManualQuoteResult = {
  subtotal: number;
  finalPrice: number;
};
