"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyDataPoint } from "@/types";
import { ChartContainer } from "./chart-container";

interface ProfitTrendChartProps {
  data: MonthlyDataPoint[];
}

export function ProfitTrendChart({ data }: ProfitTrendChartProps) {
  return (
    <ChartContainer height={260}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="month"
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#71717a"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
        />
        <Tooltip
          contentStyle={{
            background: "#18181b",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value: number) => [
            `₹${value.toLocaleString("en-IN")}`,
            "",
          ]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          fill="url(#revenueGrad)"
          strokeWidth={2}
          name="Revenue"
        />
        <Area
          type="monotone"
          dataKey="profit"
          stroke="#6366f1"
          fill="url(#profitGrad)"
          strokeWidth={2}
          name="Profit"
        />
      </AreaChart>
    </ResponsiveContainer>
    </ChartContainer>
  );
}
