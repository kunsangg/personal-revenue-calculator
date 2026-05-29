import type { ScalingInputs } from "@/types";

export interface ScalingScenario {
  multiplier: number;
  dailyBudget: number;
  orders: number;
  revenue: number;
  profit: number;
  riskLevel: "safe" | "moderate" | "aggressive" | "danger";
}

export interface ScalingOutputs {
  scenarios: ScalingScenario[];
  safeZoneMultiplier: number;
  maxRecommendedMultiplier: number;
  currentProfit: number;
  scaledProfit: number;
}

export function calculateScaling(inputs: ScalingInputs): ScalingOutputs {
  const {
    currentDailyBudget,
    currentOrders,
    profitPerOrder,
    scaleMultiplier,
    efficiencyDecay,
  } = inputs;

  const multipliers = [1, 1.25, 1.5, 2, 2.5, 3, scaleMultiplier].filter(
    (v, i, arr) => arr.indexOf(v) === i
  );

  const scenarios: ScalingScenario[] = multipliers.map((m) => {
    const efficiency = Math.pow(1 - efficiencyDecay / 100, m - 1);
    const dailyBudget = currentDailyBudget * m;
    const orders = currentOrders * m * efficiency;
    const aov = 1299;
    const revenue = orders * aov;
    const profit = orders * profitPerOrder * efficiency - dailyBudget * 0.3;

    let riskLevel: ScalingScenario["riskLevel"] = "safe";
    if (m >= 2.5) riskLevel = "danger";
    else if (m >= 2) riskLevel = "aggressive";
    else if (m >= 1.5) riskLevel = "moderate";

    return {
      multiplier: m,
      dailyBudget,
      orders,
      revenue,
      profit,
      riskLevel,
    };
  });

  const currentProfit =
    currentOrders * profitPerOrder - currentDailyBudget * 0.3;
  const scaled = scenarios.find((s) => s.multiplier === scaleMultiplier);
  const safeZone = scenarios.filter((s) => s.profit > 0 && s.riskLevel === "safe");
  const safeZoneMultiplier = safeZone.length
    ? Math.max(...safeZone.map((s) => s.multiplier))
    : 1;

  return {
    scenarios,
    safeZoneMultiplier,
    maxRecommendedMultiplier: safeZoneMultiplier * 1.5,
    currentProfit,
    scaledProfit: scaled?.profit ?? currentProfit,
  };
}
