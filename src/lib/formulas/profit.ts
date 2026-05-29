import type { ProfitInputs, ProfitOutputs } from "@/types";

export function calculateProfit(inputs: ProfitInputs): ProfitOutputs {
  const {
    sellingPrice,
    productCost,
    shippingCost,
    reverseShipping,
    packaging,
    codFee,
    gatewayFee,
    platformFee,
    gstPercent,
    adSpend,
    discounts,
    returnRate,
    rtoRate,
    refundLosses,
    monthlyOrders,
  } = inputs;

  const discountAmount = sellingPrice * (discounts / 100);
  const priceAfterDiscount = sellingPrice - discountAmount;
  const revenuePerOrder =
    priceAfterDiscount / (1 + gstPercent / 100);

  const codAmount = revenuePerOrder * (codFee / 100);
  const gatewayAmount = revenuePerOrder * (gatewayFee / 100);
  const platformAmount = revenuePerOrder * (platformFee / 100);

  const forwardLogistics = shippingCost + packaging;
  const rtoLoss =
    (rtoRate / 100) * (reverseShipping + productCost * 0.5);
  const returnLoss =
    (returnRate / 100) * (refundLosses + reverseShipping);
  const adCostPerOrder = monthlyOrders > 0 ? adSpend / monthlyOrders : adSpend;

  const totalCostPerOrder =
    productCost +
    forwardLogistics +
    codAmount +
    gatewayAmount +
    platformAmount +
    adCostPerOrder +
    rtoLoss +
    returnLoss;

  const grossProfit = revenuePerOrder - productCost - forwardLogistics;
  const netProfit = revenuePerOrder - totalCostPerOrder;
  const netMarginPercent =
    revenuePerOrder > 0 ? (netProfit / revenuePerOrder) * 100 : 0;
  const profitPerOrder = netProfit;
  const breakEvenRoas =
    netProfit > 0 && adCostPerOrder > 0
      ? revenuePerOrder / adCostPerOrder
      : adCostPerOrder > 0
        ? Infinity
        : 0;
  const monthlyProjectedProfit = netProfit * monthlyOrders;

  return {
    grossProfit,
    netProfit,
    netMarginPercent,
    profitPerOrder,
    breakEvenRoas: isFinite(breakEvenRoas) ? breakEvenRoas : 999,
    monthlyProjectedProfit,
    totalCostPerOrder,
    revenuePerOrder,
  };
}
