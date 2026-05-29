import type { Insight, ProfitInputs, RTOInputs, AdsInputs } from "@/types";
import { calculateProfit } from "./formulas/profit";
import { calculateRTO } from "./formulas/rto";
import { calculateAds } from "./formulas/ads";

export function generateInsights(
  profitInputs: ProfitInputs,
  rtoInputs: Partial<RTOInputs>,
  adsInputs: Partial<AdsInputs>
): Insight[] {
  const insights: Insight[] = [];
  const profit = calculateProfit(profitInputs);

  if (profitInputs.rtoRate >= 20) {
    insights.push({
      id: "rto-high",
      type: "danger",
      title: "High RTO Rate",
      message: `RTO at ${profitInputs.rtoRate}% is eating into margins. Indian COD-heavy stores often target under 15%. Consider prepaid incentives.`,
      priority: 10,
    });
  }

  if (profit.netMarginPercent < 10) {
    insights.push({
      id: "margin-low",
      type: "warning",
      title: "Thin Net Margins",
      message: `Net margin is ${profit.netMarginPercent.toFixed(1)}%. Aim for 15–25% on D2C before scaling ad spend.`,
      priority: 9,
    });
  }

  if (profit.netMarginPercent >= 20) {
    insights.push({
      id: "margin-healthy",
      type: "success",
      title: "Healthy Margins",
      message: `Net margin of ${profit.netMarginPercent.toFixed(1)}% gives room to scale profitably.`,
      priority: 5,
    });
  }

  const roas = profitInputs.monthlyOrders > 0
    ? (profit.revenuePerOrder * profitInputs.monthlyOrders) / profitInputs.adSpend
    : 0;

  if (roas > 0 && roas < profit.breakEvenRoas) {
    insights.push({
      id: "roas-unsafe",
      type: "danger",
      title: "ROAS Below Break-even",
      message: `Current ROAS (${roas.toFixed(2)}x) is below break-even (${profit.breakEvenRoas.toFixed(2)}x). Scaling ads now will burn cash.`,
      priority: 10,
    });
  } else if (roas >= profit.breakEvenRoas * 1.2) {
    insights.push({
      id: "roas-safe",
      type: "success",
      title: "ROAS Safe for Scaling",
      message: `ROAS at ${roas.toFixed(2)}x exceeds break-even. Consider gradual 15–20% budget increases.`,
      priority: 6,
    });
  }

  const cac = profitInputs.monthlyOrders > 0
    ? profitInputs.adSpend / profitInputs.monthlyOrders
    : 0;

  if (cac > profit.profitPerOrder * 0.8 && cac > 0) {
    insights.push({
      id: "cac-high",
      type: "warning",
      title: "CAC Too High",
      message: `CAC (₹${Math.round(cac)}) is close to profit per order (₹${Math.round(profit.profitPerOrder)}). Optimize creatives and landing pages.`,
      priority: 8,
    });
  }

  if (profitInputs.codFee > 0 && profitInputs.rtoRate > 15) {
    insights.push({
      id: "prepaid-tip",
      type: "info",
      title: "Prepaid Strategy",
      message: "Prepaid orders typically see 40–60% lower RTO. A 5% prepaid discount may still improve net profit.",
      priority: 7,
    });
  }

  if (rtoInputs.orders && rtoInputs.rtoRate) {
    const rto = calculateRTO({
      orders: rtoInputs.orders,
      rtoRate: rtoInputs.rtoRate,
      reverseShippingCost: rtoInputs.reverseShippingCost ?? 55,
      productCost: rtoInputs.productCost ?? 450,
      refundAmount: rtoInputs.refundAmount ?? 200,
      damageLossPercent: rtoInputs.damageLossPercent ?? 5,
      recoveryRate: rtoInputs.recoveryRate ?? 30,
    });

    if (rto.totalRTOLoss > 50000) {
      insights.push({
        id: "rto-loss-big",
        type: "danger",
        title: "RTO Losses Significant",
        message: `RTO losses of ₹${Math.round(rto.totalRTOLoss).toLocaleString("en-IN")} are materially impacting profitability.`,
        priority: 9,
      });
    }
  }

  if (adsInputs.dailyBudget && adsInputs.aov) {
    const ads = calculateAds({
      cpm: adsInputs.cpm ?? 180,
      ctr: adsInputs.ctr ?? 1.2,
      cpc: adsInputs.cpc ?? 12,
      cac: adsInputs.cac ?? 285,
      conversionRate: adsInputs.conversionRate ?? 2.5,
      dailyBudget: adsInputs.dailyBudget,
      aov: adsInputs.aov,
      profitPerOrder: profit.profitPerOrder,
    });

    if (!ads.isProfitable) {
      insights.push({
        id: "ads-unprofitable",
        type: "warning",
        title: "Daily Ads Unprofitable",
        message: "At current settings, estimated daily ad profit is negative. Review targeting before scaling.",
        priority: 8,
      });
    }
  }

  if (profitInputs.gstPercent === 18) {
    insights.push({
      id: "gst-note",
      type: "info",
      title: "GST Compliance",
      message: "Ensure GST is correctly applied on selling price. Use exclusive pricing for B2B invoicing.",
      priority: 3,
    });
  }

  return insights.sort((a, b) => b.priority - a.priority);
}
