"use client";

import { useMemo } from "react";
import { Download, Save } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { OutputPanel } from "@/components/modules/output-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateProfit } from "@/lib/formulas";
import { exportProfitReport } from "@/lib/export-pdf";

export default function ProfitCalculatorPage() {
  const { profitInputs, setProfitInputs, saveScenario } = useProfitStore();
  const outputs = useMemo(
    () => calculateProfit(profitInputs),
    [profitInputs]
  );

  const handleSave = () => {
    const name = prompt("Scenario name:", "My Scenario");
    if (name) saveScenario(name);
  };

  return (
    <div>
      <PageHeader
        title="Profit Calculator"
        description="Calculate per-order and monthly profitability with all Indian ecommerce costs."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save Scenario
            </Button>
            <Button
              size="sm"
              onClick={() => exportProfitReport(profitInputs, outputs)}
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Costs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Selling Price"
              value={profitInputs.sellingPrice}
              onChange={(v) => setProfitInputs({ sellingPrice: v })}
              prefix="₹"
              tooltip="MRP or discounted selling price per unit"
            />
            <NumberInput
              label="Product Cost"
              value={profitInputs.productCost}
              onChange={(v) => setProfitInputs({ productCost: v })}
              prefix="₹"
            />
            <NumberInput
              label="Shipping Cost"
              value={profitInputs.shippingCost}
              onChange={(v) => setProfitInputs({ shippingCost: v })}
              prefix="₹"
            />
            <NumberInput
              label="Reverse Shipping"
              value={profitInputs.reverseShipping}
              onChange={(v) => setProfitInputs({ reverseShipping: v })}
              prefix="₹"
            />
            <NumberInput
              label="Packaging"
              value={profitInputs.packaging}
              onChange={(v) => setProfitInputs({ packaging: v })}
              prefix="₹"
            />
            <NumberInput
              label="Monthly Orders"
              value={profitInputs.monthlyOrders}
              onChange={(v) => setProfitInputs({ monthlyOrders: v })}
              showSlider
              sliderMax={5000}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fees & Rates</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="COD Fee"
              value={profitInputs.codFee}
              onChange={(v) => setProfitInputs({ codFee: v })}
              suffix="%"
              showSlider
              sliderMax={5}
            />
            <NumberInput
              label="Gateway Fee"
              value={profitInputs.gatewayFee}
              onChange={(v) => setProfitInputs({ gatewayFee: v })}
              suffix="%"
              showSlider
              sliderMax={5}
            />
            <NumberInput
              label="Platform Fee"
              value={profitInputs.platformFee}
              onChange={(v) => setProfitInputs({ platformFee: v })}
              suffix="%"
              showSlider
              sliderMax={20}
            />
            <NumberInput
              label="GST"
              value={profitInputs.gstPercent}
              onChange={(v) => setProfitInputs({ gstPercent: v })}
              suffix="%"
              showSlider
              sliderMax={28}
            />
            <NumberInput
              label="Discounts"
              value={profitInputs.discounts}
              onChange={(v) => setProfitInputs({ discounts: v })}
              suffix="%"
              showSlider
              sliderMax={50}
            />
            <NumberInput
              label="Ad Spend (Monthly)"
              value={profitInputs.adSpend}
              onChange={(v) => setProfitInputs({ adSpend: v })}
              prefix="₹"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Returns & RTO</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Return Rate"
              value={profitInputs.returnRate}
              onChange={(v) => setProfitInputs({ returnRate: v })}
              suffix="%"
              showSlider
              sliderMax={30}
            />
            <NumberInput
              label="RTO Rate"
              value={profitInputs.rtoRate}
              onChange={(v) => setProfitInputs({ rtoRate: v })}
              suffix="%"
              showSlider
              sliderMax={50}
              tooltip="Return to Origin — typical Indian COD rate 15-30%"
            />
            <NumberInput
              label="Refund Losses"
              value={profitInputs.refundLosses}
              onChange={(v) => setProfitInputs({ refundLosses: v })}
              prefix="₹"
            />
          </CardContent>
        </Card>

        <OutputPanel
          title="Live Results"
          items={[
            {
              label: "Gross Profit / Order",
              value: outputs.grossProfit,
              highlight: outputs.grossProfit >= 0 ? "profit" : "loss",
            },
            {
              label: "Net Profit / Order",
              value: outputs.netProfit,
              highlight: outputs.netProfit >= 0 ? "profit" : "loss",
            },
            {
              label: "Net Margin",
              value: outputs.netMarginPercent,
              format: "percent",
              highlight: outputs.netMarginPercent >= 15 ? "profit" : "loss",
            },
            {
              label: "Profit per Order",
              value: outputs.profitPerOrder,
              highlight: "profit",
            },
            {
              label: "Break-even ROAS",
              value: outputs.breakEvenRoas,
              format: "multiplier",
            },
            {
              label: "Monthly Projected Profit",
              value: outputs.monthlyProjectedProfit,
              highlight: outputs.monthlyProjectedProfit >= 0 ? "profit" : "loss",
            },
          ]}
        />
      </div>
    </div>
  );
}
