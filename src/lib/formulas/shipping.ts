import type { ShippingInputs } from "@/types";

const ZONE_MULTIPLIERS: Record<number, number> = {
  1: 1,
  2: 1.15,
  3: 1.3,
  4: 1.5,
  5: 1.8,
};

export interface ShippingOutputs {
  forwardCost: number;
  reverseCost: number;
  codCharge: number;
  totalLogisticsCost: number;
  marginImpactPercent: number;
}

export function calculateShipping(
  inputs: ShippingInputs,
  sellingPrice = 999
): ShippingOutputs {
  const zoneMultiplier = ZONE_MULTIPLIERS[inputs.zone] ?? 1;
  const weightFactor = 1 + (inputs.weight - 0.5) * 0.1;

  const forwardCost =
    inputs.forwardBase * zoneMultiplier * Math.max(weightFactor, 1);
  const reverseCost =
    inputs.reverseBase * zoneMultiplier * Math.max(weightFactor, 0.8);
  const codCharge = inputs.isCod ? forwardCost * 0.02 + 25 : 0;
  const totalLogisticsCost = forwardCost + codCharge;
  const marginImpactPercent =
    sellingPrice > 0 ? (totalLogisticsCost / sellingPrice) * 100 : 0;

  return {
    forwardCost,
    reverseCost,
    codCharge,
    totalLogisticsCost,
    marginImpactPercent,
  };
}
