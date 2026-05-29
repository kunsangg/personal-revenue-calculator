import type { BreakEvenInputs } from "@/types";

export interface BreakEvenOutputs {
  minSellingPrice: number;
  maxAdSpendAllowed: number;
  requiredConversionRate: number;
  requiredRoas: number;
  breakEvenOrders: number;
  currentMargin: number;
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenOutputs {
  const {
    fixedCosts,
    variableCostPerOrder,
    sellingPrice,
    currentAdSpend,
    currentOrders,
    targetMarginPercent,
  } = inputs;

  const targetMargin = targetMarginPercent / 100;
  const minSellingPrice =
    variableCostPerOrder / (1 - targetMargin) || variableCostPerOrder;
  const contributionPerOrder = sellingPrice - variableCostPerOrder;
  const breakEvenOrders =
    contributionPerOrder > 0
      ? Math.ceil(fixedCosts / contributionPerOrder)
      : Infinity;
  const maxAdSpendAllowed = Math.max(
    0,
    currentOrders * contributionPerOrder - fixedCosts
  );
  const requiredRoas =
    currentAdSpend > 0 && sellingPrice > 0
      ? (currentOrders * sellingPrice) / currentAdSpend
      : 0;
  const requiredConversionRate =
    currentOrders > 0 ? (currentOrders / (currentOrders * 50)) * 100 : 2;
  const currentMargin =
    sellingPrice > 0
      ? ((sellingPrice - variableCostPerOrder) / sellingPrice) * 100
      : 0;

  return {
    minSellingPrice,
    maxAdSpendAllowed,
    requiredConversionRate: Math.max(requiredConversionRate, 0.5),
    requiredRoas,
    breakEvenOrders: isFinite(breakEvenOrders) ? breakEvenOrders : 0,
    currentMargin,
  };
}
