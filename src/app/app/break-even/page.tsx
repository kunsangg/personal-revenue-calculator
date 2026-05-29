"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { OutputPanel } from "@/components/modules/output-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateBreakEven } from "@/lib/formulas";

export default function BreakEvenPage() {
  const { breakEvenInputs, setBreakEvenInputs } = useProfitStore();
  const outputs = useMemo(
    () => calculateBreakEven(breakEvenInputs),
    [breakEvenInputs]
  );

  return (
    <div>
      <PageHeader
        title="Break-even Calculator"
        description="Find minimum selling price, max ad spend, and required ROAS to stay profitable."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Parameters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Fixed Costs" value={breakEvenInputs.fixedCosts} onChange={(v) => setBreakEvenInputs({ fixedCosts: v })} prefix="₹" />
            <NumberInput label="Variable Cost / Order" value={breakEvenInputs.variableCostPerOrder} onChange={(v) => setBreakEvenInputs({ variableCostPerOrder: v })} prefix="₹" />
            <NumberInput label="Selling Price" value={breakEvenInputs.sellingPrice} onChange={(v) => setBreakEvenInputs({ sellingPrice: v })} prefix="₹" />
            <NumberInput label="Current Ad Spend" value={breakEvenInputs.currentAdSpend} onChange={(v) => setBreakEvenInputs({ currentAdSpend: v })} prefix="₹" />
            <NumberInput label="Current Orders" value={breakEvenInputs.currentOrders} onChange={(v) => setBreakEvenInputs({ currentOrders: v })} />
            <NumberInput label="Target Margin" value={breakEvenInputs.targetMarginPercent} onChange={(v) => setBreakEvenInputs({ targetMarginPercent: v })} suffix="%" showSlider sliderMax={50} />
          </CardContent>
        </Card>

        <OutputPanel
          title="Break-even Analysis"
          items={[
            { label: "Min Selling Price", value: outputs.minSellingPrice },
            { label: "Max Ad Spend Allowed", value: outputs.maxAdSpendAllowed, highlight: "profit" },
            { label: "Required Conversion", value: outputs.requiredConversionRate, format: "percent" },
            { label: "Required ROAS", value: outputs.requiredRoas, format: "multiplier" },
            { label: "Break-even Orders", value: outputs.breakEvenOrders, format: "number" },
            { label: "Current Margin", value: outputs.currentMargin, format: "percent" },
          ]}
        />
      </div>
    </div>
  );
}
