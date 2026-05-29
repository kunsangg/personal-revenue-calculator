import type { GSTInputs } from "@/types";

export interface GSTOutputs {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  postTaxProfit?: number;
  costBeforeGst?: number;
}

export function calculateGST(
  inputs: GSTInputs,
  costBase = 0
): GSTOutputs {
  const { amount, gstRate, isInclusive } = inputs;
  const rate = gstRate / 100;

  let baseAmount: number;
  let gstAmount: number;
  let totalAmount: number;

  if (isInclusive) {
    baseAmount = amount / (1 + rate);
    gstAmount = amount - baseAmount;
    totalAmount = amount;
  } else {
    baseAmount = amount;
    gstAmount = amount * rate;
    totalAmount = amount + gstAmount;
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  const igst = gstAmount;
  const postTaxProfit = baseAmount - costBase;

  return {
    baseAmount,
    gstAmount,
    totalAmount,
    cgst,
    sgst,
    igst,
    postTaxProfit,
    costBeforeGst: costBase,
  };
}
