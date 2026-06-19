import type { ManualQuoteInput, ManualQuoteResult } from "@/features/quote-calculator/types";

export function calculateManualQuote(input: ManualQuoteInput): ManualQuoteResult {
  const subtotal = input.materialCost + input.laborCost + input.machineCost;
  const finalPrice = subtotal + subtotal * (input.marginPercentage / 100);

  return {
    subtotal,
    finalPrice
  };
}
