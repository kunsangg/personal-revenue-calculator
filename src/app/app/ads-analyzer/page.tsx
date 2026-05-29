"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { OutputPanel } from "@/components/modules/output-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateAds } from "@/lib/formulas";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ChartContainer } from "@/components/charts/chart-container";

const performanceData = [
  { day: "Mon", roas: 2.8, spend: 3200 },
  { day: "Tue", roas: 3.1, spend: 3400 },
  { day: "Wed", roas: 2.9, spend: 3500 },
  { day: "Thu", roas: 3.4, spend: 3600 },
  { day: "Fri", roas: 3.2, spend: 3500 },
  { day: "Sat", roas: 3.6, spend: 3800 },
  { day: "Sun", roas: 3.5, spend: 3700 },
];

export default function AdsAnalyzerPage() {
  const { adsInputs, setAdsInputs } = useProfitStore();
  const outputs = useMemo(() => calculateAds(adsInputs), [adsInputs]);

  return (
    <div>
      <PageHeader
        title="Ads Analyzer"
        description="Meta & Google ads performance — estimate orders, revenue, and safe scaling limits."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="CPM" value={adsInputs.cpm} onChange={(v) => setAdsInputs({ cpm: v })} prefix="₹" />
            <NumberInput label="CTR" value={adsInputs.ctr} onChange={(v) => setAdsInputs({ ctr: v })} suffix="%" showSlider sliderMax={5} />
            <NumberInput label="CPC" value={adsInputs.cpc} onChange={(v) => setAdsInputs({ cpc: v })} prefix="₹" />
            <NumberInput label="CAC" value={adsInputs.cac} onChange={(v) => setAdsInputs({ cac: v })} prefix="₹" />
            <NumberInput label="Conversion Rate" value={adsInputs.conversionRate} onChange={(v) => setAdsInputs({ conversionRate: v })} suffix="%" showSlider sliderMax={10} />
            <NumberInput label="Daily Budget" value={adsInputs.dailyBudget} onChange={(v) => setAdsInputs({ dailyBudget: v })} prefix="₹" />
            <NumberInput label="AOV" value={adsInputs.aov} onChange={(v) => setAdsInputs({ aov: v })} prefix="₹" />
            <NumberInput label="Profit / Order" value={adsInputs.profitPerOrder} onChange={(v) => setAdsInputs({ profitPerOrder: v })} prefix="₹" />
          </CardContent>
        </Card>

        <OutputPanel
          title="Daily Estimates"
          items={[
            { label: "Est. Clicks", value: outputs.estimatedClicks, format: "number" },
            { label: "Est. Orders", value: outputs.estimatedOrders, format: "number" },
            { label: "Est. Revenue", value: outputs.estimatedRevenue, highlight: "profit" },
            {
              label: "Est. Profit",
              value: outputs.estimatedProfit,
              highlight: outputs.isProfitable ? "profit" : "loss",
            },
            { label: "Actual ROAS", value: outputs.actualRoas, format: "multiplier" },
            { label: "Break-even ROAS", value: outputs.breakEvenRoas, format: "multiplier" },
            {
              label: "Safe Scaling",
              value: outputs.safeScalingPercent,
              format: "percent",
            },
          ]}
        />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>7-Day ROAS Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#71717a" fontSize={12} />
              <YAxis stroke="#71717a" fontSize={12} />
              <Tooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="roas" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1" }} name="ROAS" />
            </LineChart>
          </ResponsiveContainer>
          </ChartContainer>
          {!outputs.isProfitable && (
            <p className="mt-4 text-sm text-amber-400">
              Recommendation: Do not scale budget until ROAS exceeds break-even (
              {outputs.breakEvenRoas.toFixed(2)}x).
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
