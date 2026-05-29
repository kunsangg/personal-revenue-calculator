"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitTrendChart } from "@/components/charts/profit-trend-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import {
  seedDashboardMetrics,
  seedMonthlyData,
  seedExpenseBreakdown,
} from "@/lib/seed-data";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateProfit } from "@/lib/formulas";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const profitInputs = useProfitStore((s) => s.profitInputs);
  const profit = calculateProfit(profitInputs);
  const metrics = seedDashboardMetrics;

  const projectionData = seedMonthlyData.map((m, i) => ({
    month: m.month,
    projected: m.profit * (1 + i * 0.03),
    actual: m.profit,
  }));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Real-time overview of your ecommerce profitability — synced with calculator inputs."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          change={12.4}
          tooltip="Monthly gross revenue from delivered orders"
        />
        <MetricCard
          title="Net Profit"
          value={profit.monthlyProjectedProfit}
          variant="profit"
          change={8.2}
          tooltip="Projected monthly net profit from current inputs"
        />
        <MetricCard
          title="Gross Margin"
          value={profit.netMarginPercent + 15}
          format="percent"
          change={2.1}
        />
        <MetricCard
          title="ROAS"
          value={
            profitInputs.adSpend > 0
              ? (profit.revenuePerOrder * profitInputs.monthlyOrders) /
                profitInputs.adSpend
              : metrics.roas
          }
          format="multiplier"
          change={-3.2}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="CAC" value={metrics.cac} change={5.1} />
        <MetricCard
          title="RTO %"
          value={profitInputs.rtoRate}
          format="percent"
          variant="loss"
        />
        <MetricCard
          title="Orders Delivered"
          value={Math.round(
            profitInputs.monthlyOrders * (1 - profitInputs.rtoRate / 100)
          )}
          format="number"
        />
        <MetricCard
          title="Losses"
          value={metrics.losses}
          variant="loss"
          change={-4.5}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:border-white/15 transition-colors">
            <CardHeader>
              <CardTitle>Profit Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfitTrendChart data={seedMonthlyData} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="hover:border-white/15 transition-colors">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpensePieChart data={seedExpenseBreakdown} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Monthly Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} name="Actual" />
                <Bar dataKey="projected" fill="#10b981" radius={[4, 4, 0, 0]} name="Projected" opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
