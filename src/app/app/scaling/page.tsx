"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateScaling } from "@/lib/formulas";
import { formatINR, cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const riskColors = {
  safe: "#10b981",
  moderate: "#f59e0b",
  aggressive: "#f97316",
  danger: "#ef4444",
};

export default function ScalingPage() {
  const { scalingInputs, setScalingInputs } = useProfitStore();
  const outputs = useMemo(
    () => calculateScaling(scalingInputs),
    [scalingInputs]
  );

  const chartData = outputs.scenarios.map((s) => ({
    name: `${s.multiplier}x`,
    profit: s.profit,
    risk: s.riskLevel,
  }));

  return (
    <div>
      <PageHeader
        title="Scaling Simulator"
        description="Simulate ad spend scaling with efficiency decay — find your safe scaling zone."
      />

      <Card className="mb-6">
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <NumberInput label="Daily Budget" value={scalingInputs.currentDailyBudget} onChange={(v) => setScalingInputs({ currentDailyBudget: v })} prefix="₹" />
          <NumberInput label="Daily Orders" value={scalingInputs.currentOrders} onChange={(v) => setScalingInputs({ currentOrders: v })} />
          <NumberInput label="Profit / Order" value={scalingInputs.profitPerOrder} onChange={(v) => setScalingInputs({ profitPerOrder: v })} prefix="₹" />
          <NumberInput label="Scale Multiplier" value={scalingInputs.scaleMultiplier} onChange={(v) => setScalingInputs({ scaleMultiplier: v })} step={0.25} showSlider sliderMax={5} />
          <NumberInput label="Efficiency Decay %" value={scalingInputs.efficiencyDecay} onChange={(v) => setScalingInputs({ efficiencyDecay: v })} suffix="%" showSlider sliderMax={20} />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-xs text-zinc-500">Safe Zone</p>
          <p className="text-xl font-semibold text-emerald-400">
            Up to {outputs.safeZoneMultiplier}x
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-zinc-500">Current Profit</p>
          <p className="text-xl font-semibold">{formatINR(outputs.currentProfit)}</p>
        </div>
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">
          <p className="text-xs text-zinc-500">Scaled Profit</p>
          <p className="text-xl font-semibold text-indigo-300">
            {formatINR(outputs.scaledProfit)}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profit by Scale Level</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
              <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
              <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={riskColors[entry.risk as keyof typeof riskColors]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {outputs.scenarios.map((s) => (
          <div
            key={s.multiplier}
            className={cn(
              "rounded-lg border p-4 text-sm",
              s.riskLevel === "safe" && "border-emerald-500/20",
              s.riskLevel === "danger" && "border-red-500/20"
            )}
          >
            <div className="flex justify-between">
              <span className="font-medium">{s.multiplier}x Scale</span>
              <span className="capitalize text-zinc-500">{s.riskLevel}</span>
            </div>
            <p className="mt-2 text-emerald-400">{formatINR(s.profit)} profit</p>
            <p className="text-zinc-500">{s.orders.toFixed(0)} orders · {formatINR(s.dailyBudget)} budget</p>
          </div>
        ))}
      </div>
    </div>
  );
}
