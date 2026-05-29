"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { OutputPanel } from "@/components/modules/output-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateGST } from "@/lib/formulas";

export default function GSTCalculatorPage() {
  const { gstInputs, setGSTInputs, profitInputs } = useProfitStore();
  const outputs = useMemo(
    () => calculateGST(gstInputs, profitInputs.productCost),
    [gstInputs, profitInputs.productCost]
  );

  return (
    <div>
      <PageHeader
        title="GST Calculator"
        description="Inclusive & exclusive GST breakdown for Indian ecommerce — CGST, SGST & post-tax profit."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>GST Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <NumberInput
              label="Amount"
              value={gstInputs.amount}
              onChange={(v) => setGSTInputs({ amount: v })}
              prefix="₹"
            />
            <NumberInput
              label="GST Rate"
              value={gstInputs.gstRate}
              onChange={(v) => setGSTInputs({ gstRate: v })}
              suffix="%"
              showSlider
              sliderMax={28}
            />
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
              <div>
                <Label>Inclusive GST</Label>
                <p className="text-xs text-zinc-500 mt-1">
                  Price includes GST (B2C typical)
                </p>
              </div>
              <Switch
                checked={gstInputs.isInclusive}
                onCheckedChange={(v) => setGSTInputs({ isInclusive: v })}
              />
            </div>
          </CardContent>
        </Card>

        <OutputPanel
          title="GST Breakdown"
          items={[
            { label: "Base Amount", value: outputs.baseAmount },
            { label: "GST Amount", value: outputs.gstAmount },
            { label: "Total Amount", value: outputs.totalAmount },
            { label: "CGST (9%)", value: outputs.cgst },
            { label: "SGST (9%)", value: outputs.sgst },
            {
              label: "Post-tax Profit (est.)",
              value: outputs.postTaxProfit ?? 0,
              highlight:
                (outputs.postTaxProfit ?? 0) >= 0 ? "profit" : "loss",
            },
          ]}
        />
      </div>
    </div>
  );
}
