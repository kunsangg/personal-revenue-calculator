import type { CODPrepaidInputs } from "@/types";

export interface PaymentModeResult {
  effectiveOrders: number;
  revenue: number;
  totalCosts: number;
  netProfit: number;
  marginPercent: number;
  rtoLoss: number;
}

export interface CODPrepaidOutputs {
  cod: PaymentModeResult;
  prepaid: PaymentModeResult;
  recommendation: "cod" | "prepaid" | "hybrid";
  conversionDelta: number;
  profitDelta: number;
}

export function calculateCODPrepaid(
  inputs: CODPrepaidInputs
): CODPrepaidOutputs {
  const calcMode = (
    isCod: boolean,
    rtoRate: number,
    feePercent: number,
    conversionRate: number
  ): PaymentModeResult => {
    const effectiveOrders = inputs.orders * (conversionRate / 100);
    const revenue = effectiveOrders * inputs.sellingPrice;
    const feeCost = revenue * (feePercent / 100);
    const logistics = effectiveOrders * inputs.shippingCost;
    const productCost = effectiveOrders * inputs.productCost;
    const rtoOrders = effectiveOrders * (rtoRate / 100);
    const rtoLoss =
      rtoOrders * (inputs.reverseShipping + inputs.productCost * 0.4);
    const totalCosts = feeCost + logistics + productCost + rtoLoss;
    const netProfit = revenue - totalCosts;
    const marginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    return {
      effectiveOrders,
      revenue,
      totalCosts,
      netProfit,
      marginPercent,
      rtoLoss,
    };
  };

  const cod = calcMode(
    true,
    inputs.codRtoRate,
    inputs.codFeePercent,
    inputs.codConversionRate
  );
  const prepaid = calcMode(
    false,
    inputs.prepaidRtoRate,
    inputs.gatewayFeePercent,
    inputs.prepaidConversionRate
  );

  const profitDelta = prepaid.netProfit - cod.netProfit;
  const conversionDelta =
    prepaid.effectiveOrders - cod.effectiveOrders;

  let recommendation: CODPrepaidOutputs["recommendation"] = "hybrid";
  if (profitDelta > 5000 && prepaid.marginPercent > cod.marginPercent) {
    recommendation = "prepaid";
  } else if (cod.netProfit > prepaid.netProfit * 1.1) {
    recommendation = "cod";
  }

  return {
    cod,
    prepaid,
    recommendation,
    conversionDelta,
    profitDelta,
  };
}
