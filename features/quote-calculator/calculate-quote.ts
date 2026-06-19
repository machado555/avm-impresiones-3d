import type { PrintMaterial, QuoteInput, QuoteResult } from "@/types/custom-requests";

type QuoteRule = {
  machineHourRate: number;
  electricityHourRate: number;
  laborHourRate: number;
  defaultMarginPercentage: number;
  minimumPrice: number;
};

export function calculatePrintQuote(input: QuoteInput, material: PrintMaterial, rule: QuoteRule): QuoteResult {
  const printHours = input.estimatedPrintTimeMinutes / 60;
  const laborHours = input.laborMinutes / 60;
  const materialCost = input.estimatedWeightGrams * material.costPerGram;
  const machineCost = printHours * (rule.machineHourRate + rule.electricityHourRate);
  const laborCost = laborHours * rule.laborHourRate;
  const subtotal = materialCost + machineCost + laborCost;
  const marginPercentage = material.defaultMarginPercentage || rule.defaultMarginPercentage;
  const marginAmount = subtotal * (marginPercentage / 100);
  const finalPrice = Math.max(subtotal + marginAmount, rule.minimumPrice);

  return {
    materialCost,
    machineCost,
    laborCost,
    marginAmount,
    finalPrice
  };
}
