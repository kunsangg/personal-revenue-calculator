"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { ExpenseBreakdown } from "@/types";
import { ChartContainer } from "./chart-container";

interface ExpensePieChartProps {
  data: ExpenseBreakdown[];
}

export function ExpensePieChart({ data }: ExpensePieChartProps) {
  return (
    <ChartContainer height={280}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#18181b",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [
            `₹${value.toLocaleString("en-IN")}`,
            "",
          ]}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
          formatter={(value) => (
            <span className="text-zinc-400">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
    </ChartContainer>
  );
}
