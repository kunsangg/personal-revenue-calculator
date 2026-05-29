"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateCODPrepaid } from "@/lib/formulas";
import { formatINR, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function CODPrepaidPage() {
  const { codPrepaidInputs, setCODPrepaidInputs } = useProfitStore();
  const outputs = useMemo(
    () => calculateCODPrepaid(codPrepaidInputs),
    [codPrepaidInputs]
  );

  const ModeCard = ({
    title,
    data,
    recommended,
  }: {
    title: string;
    data: typeof outputs.cod;
    recommended: boolean;
  }) => (
    <Card
      className={cn(
        "transition-all",
        recommended && "border-indigo-500/40 ring-1 ring-indigo-500/20"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {recommended && (
          <span className="flex items-center gap-1 text-xs text-indigo-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Recommended
          </span>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          ["Effective Orders", data.effectiveOrders.toFixed(0)],
          ["Revenue", formatINR(data.revenue)],
          ["Total Costs", formatINR(data.totalCosts)],
          ["Net Profit", formatINR(data.netProfit)],
          ["Margin", `${data.marginPercent.toFixed(1)}%`],
          ["RTO Loss", formatINR(data.rtoLoss)],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-zinc-400">{label}</span>
            <span
              className={cn(
                "font-medium",
                label === "Net Profit" && data.netProfit >= 0 && "text-emerald-400",
                label === "Net Profit" && data.netProfit < 0 && "text-red-400"
              )}
            >
              {val}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div>
      <PageHeader
        title="COD vs Prepaid"
        description="Side-by-side comparison with conversion and RTO impact — find your optimal payment mix."
      />

      <Card className="mb-6">
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <NumberInput label="Orders" value={codPrepaidInputs.orders} onChange={(v) => setCODPrepaidInputs({ orders: v })} />
          <NumberInput label="Selling Price" value={codPrepaidInputs.sellingPrice} onChange={(v) => setCODPrepaidInputs({ sellingPrice: v })} prefix="₹" />
          <NumberInput label="COD RTO %" value={codPrepaidInputs.codRtoRate} onChange={(v) => setCODPrepaidInputs({ codRtoRate: v })} suffix="%" showSlider sliderMax={40} />
          <NumberInput label="Prepaid RTO %" value={codPrepaidInputs.prepaidRtoRate} onChange={(v) => setCODPrepaidInputs({ prepaidRtoRate: v })} suffix="%" showSlider sliderMax={20} />
          <NumberInput label="COD Conversion" value={codPrepaidInputs.codConversionRate} onChange={(v) => setCODPrepaidInputs({ codConversionRate: v })} suffix="%" showSlider sliderMax={100} />
          <NumberInput label="Prepaid Conversion" value={codPrepaidInputs.prepaidConversionRate} onChange={(v) => setCODPrepaidInputs({ prepaidConversionRate: v })} suffix="%" showSlider sliderMax={100} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <ModeCard
          title="COD"
          data={outputs.cod}
          recommended={outputs.recommendation === "cod"}
        />
        <ModeCard
          title="Prepaid"
          data={outputs.prepaid}
          recommended={outputs.recommendation === "prepaid"}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-6"
      >
        <h3 className="font-semibold text-indigo-300">Recommendation Engine</h3>
        <p className="mt-2 text-sm text-zinc-300">
          {outputs.recommendation === "prepaid" &&
            "Prepaid is more profitable. Offer 5–10% prepaid discount to shift COD buyers."}
          {outputs.recommendation === "cod" &&
            "COD drives higher conversion in your model. Optimize RTO with IVR confirmation."}
          {outputs.recommendation === "hybrid" &&
            "Hybrid strategy recommended — keep COD for acquisition, push prepaid on repeat buyers."}
        </p>
        <p className="mt-2 text-xs text-zinc-500">
          Profit delta: {formatINR(outputs.profitDelta)} | Conversion delta:{" "}
          {outputs.conversionDelta.toFixed(0)} orders
        </p>
      </motion.div>
    </div>
  );
}
