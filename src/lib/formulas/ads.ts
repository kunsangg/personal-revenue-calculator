import type { AdsInputs } from "@/types";

export interface AdsOutputs {
  estimatedClicks: number;
  estimatedOrders: number;
  estimatedRevenue: number;
  estimatedProfit: number;
  breakEvenRoas: number;
  actualRoas: number;
  isProfitable: boolean;
  safeScalingPercent: number;
  dailyImpressions: number;
}

export function calculateAds(inputs: AdsInputs): AdsOutputs {
  const {
    cpm,
    ctr,
    cpc,
    cac,
    conversionRate,
    dailyBudget,
    aov,
    profitPerOrder,
  } = inputs;

  const dailyImpressions = cpm > 0 ? (dailyBudget / cpm) * 1000 : 0;
  const estimatedClicks =
    cpc > 0
      ? dailyBudget / cpc
      : dailyImpressions * (ctr / 100);
  const estimatedOrders =
    cac > 0
      ? dailyBudget / cac
      : estimatedClicks * (conversionRate / 100);
  const estimatedRevenue = estimatedOrders * aov;
  const estimatedAdCost = dailyBudget;
  const estimatedProfit = estimatedOrders * profitPerOrder - estimatedAdCost;
  const actualRoas =
    estimatedAdCost > 0 ? estimatedRevenue / estimatedAdCost : 0;
  const breakEvenRoas =
    profitPerOrder > 0 && aov > 0
      ? aov / (aov - profitPerOrder)
      : 0;
  const isProfitable = estimatedProfit > 0;
  const margin = profitPerOrder / (aov || 1);
  const safeScalingPercent = isProfitable
    ? clamp(margin * 100 - 10, 5, 50)
    : 0;

  return {
    estimatedClicks,
    estimatedOrders,
    estimatedRevenue,
    estimatedProfit,
    breakEvenRoas,
    actualRoas,
    isProfitable,
    safeScalingPercent,
    dailyImpressions,
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}
