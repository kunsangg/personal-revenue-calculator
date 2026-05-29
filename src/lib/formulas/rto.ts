import type { RTOInputs } from "@/types";

export interface RTOOutputs {
  rtoOrders: number;
  reverseShippingLoss: number;
  refundImpact: number;
  damageLoss: number;
  productRecovery: number;
  totalRTOLoss: number;
  lossPerOrder: number;
  rtoSeverity: "low" | "medium" | "high" | "critical";
}

export function calculateRTO(inputs: RTOInputs): RTOOutputs {
  const {
    orders,
    rtoRate,
    reverseShippingCost,
    productCost,
    refundAmount,
    damageLossPercent,
    recoveryRate,
  } = inputs;

  const rtoOrders = orders * (rtoRate / 100);
  const reverseShippingLoss = rtoOrders * reverseShippingCost;
  const refundImpact = rtoOrders * refundAmount;
  const damageLoss = rtoOrders * productCost * (damageLossPercent / 100);
  const productRecovery = rtoOrders * productCost * (recoveryRate / 100);
  const totalRTOLoss =
    reverseShippingLoss + refundImpact + damageLoss - productRecovery;
  const lossPerOrder = orders > 0 ? totalRTOLoss / orders : 0;

  let rtoSeverity: RTOOutputs["rtoSeverity"] = "low";
  if (rtoRate >= 35) rtoSeverity = "critical";
  else if (rtoRate >= 25) rtoSeverity = "high";
  else if (rtoRate >= 15) rtoSeverity = "medium";

  return {
    rtoOrders,
    reverseShippingLoss,
    refundImpact,
    damageLoss,
    productRecovery,
    totalRTOLoss,
    lossPerOrder,
    rtoSeverity,
  };
}
