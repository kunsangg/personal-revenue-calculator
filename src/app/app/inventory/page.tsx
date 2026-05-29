"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateInventory } from "@/lib/formulas";

export default function InventoryPage() {
  const { inventoryInputs, setInventoryInputs } = useProfitStore();
  const outputs = useMemo(
    () => calculateInventory(inventoryInputs),
    [inventoryInputs]
  );

  return (
    <div>
      <PageHeader
        title="Inventory Tracker"
        description="Track inventory value, dead stock, holding costs, and turnover for D2C brands."
      />

      <Card className="mb-6">
        <CardContent className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          <NumberInput label="SKU Count" value={inventoryInputs.skuCount} onChange={(v) => setInventoryInputs({ skuCount: v })} />
          <NumberInput label="Avg Unit Cost" value={inventoryInputs.avgUnitCost} onChange={(v) => setInventoryInputs({ avgUnitCost: v })} prefix="₹" />
          <NumberInput label="Units in Stock" value={inventoryInputs.unitsInStock} onChange={(v) => setInventoryInputs({ unitsInStock: v })} />
          <NumberInput label="Dead Stock %" value={inventoryInputs.deadStockPercent} onChange={(v) => setInventoryInputs({ deadStockPercent: v })} suffix="%" showSlider sliderMax={50} />
          <NumberInput label="Holding Cost %" value={inventoryInputs.holdingCostPercent} onChange={(v) => setInventoryInputs({ holdingCostPercent: v })} suffix="%" showSlider sliderMax={30} />
          <NumberInput label="Monthly Sales" value={inventoryInputs.monthlySales} onChange={(v) => setInventoryInputs({ monthlySales: v })} />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Inventory Value" value={outputs.inventoryValue} />
        <MetricCard title="Dead Stock Value" value={outputs.deadStockValue} variant="loss" />
        <MetricCard title="Monthly Holding Cost" value={outputs.holdingCosts} />
        <MetricCard title="Warehouse Loss" value={outputs.warehouseLoss} variant="loss" />
        <MetricCard title="Turnover Ratio" value={outputs.turnoverRatio} format="number" />
        <MetricCard title="Days of Inventory" value={outputs.daysOfInventory} format="number" />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Total Carrying Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold text-red-400">
            ₹{outputs.totalCarryingCost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Combined holding, warehouse loss, and dead stock depreciation per month.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
