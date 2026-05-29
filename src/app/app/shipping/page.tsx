"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { OutputPanel } from "@/components/modules/output-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateShipping } from "@/lib/formulas";

export default function ShippingPage() {
  const { shippingInputs, setShippingInputs, profitInputs } = useProfitStore();
  const outputs = useMemo(
    () => calculateShipping(shippingInputs, profitInputs.sellingPrice),
    [shippingInputs, profitInputs.sellingPrice]
  );

  return (
    <div>
      <PageHeader
        title="Shipping Calculator"
        description="Forward & reverse logistics costs by zone — Delhivery, Shiprocket, BlueDart estimates."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <NumberInput
              label="Weight (kg)"
              value={shippingInputs.weight}
              onChange={(v) => setShippingInputs({ weight: v })}
              step={0.1}
              showSlider
              sliderMax={5}
            />
            <div className="space-y-2">
              <Label>Courier Zone</Label>
              <Select
                value={String(shippingInputs.zone)}
                onValueChange={(v) =>
                  setShippingInputs({ zone: Number(v) as 1 | 2 | 3 | 4 | 5 })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Zone A — Same city</SelectItem>
                  <SelectItem value="2">Zone B — Metro to metro</SelectItem>
                  <SelectItem value="3">Zone C — Regional</SelectItem>
                  <SelectItem value="4">Zone D — NE & J&K</SelectItem>
                  <SelectItem value="5">Zone E — Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <NumberInput
              label="Forward Base"
              value={shippingInputs.forwardBase}
              onChange={(v) => setShippingInputs({ forwardBase: v })}
              prefix="₹"
            />
            <NumberInput
              label="Reverse Base"
              value={shippingInputs.reverseBase}
              onChange={(v) => setShippingInputs({ reverseBase: v })}
              prefix="₹"
            />
            <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
              <Label>COD Shipment</Label>
              <Switch
                checked={shippingInputs.isCod}
                onCheckedChange={(v) => setShippingInputs({ isCod: v })}
              />
            </div>
          </CardContent>
        </Card>

        <OutputPanel
          title="Logistics Output"
          items={[
            { label: "Forward Cost", value: outputs.forwardCost },
            { label: "Reverse Cost", value: outputs.reverseCost },
            { label: "COD Charge", value: outputs.codCharge },
            { label: "Total Logistics", value: outputs.totalLogisticsCost },
            {
              label: "Margin Impact",
              value: outputs.marginImpactPercent,
              format: "percent",
              highlight:
                outputs.marginImpactPercent > 15 ? "loss" : "neutral",
            },
          ]}
        />
      </div>
    </div>
  );
}
