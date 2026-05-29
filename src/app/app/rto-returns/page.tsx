"use client";

import { useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { NumberInput } from "@/components/shared/number-input";
import { OutputPanel } from "@/components/modules/output-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProfitStore } from "@/store/use-profit-store";
import { calculateRTO } from "@/lib/formulas";
import { cn, formatINR } from "@/lib/utils";
import { motion } from "framer-motion";

export default function RTOReturnsPage() {
  const { rtoInputs, setRTOInputs } = useProfitStore();
  const outputs = useMemo(() => calculateRTO(rtoInputs), [rtoInputs]);

  const severityColors = {
    low: "bg-emerald-500",
    medium: "bg-amber-500",
    high: "bg-orange-500",
    critical: "bg-red-500",
  };

  const lossMeterValue = Math.min(rtoInputs.rtoRate * 2, 100);

  return (
    <div>
      <PageHeader
        title="RTO & Returns"
        description="Quantify Return-to-Origin and return losses — the silent margin killer for Indian COD businesses."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>RTO Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <NumberInput
              label="Total Orders"
              value={rtoInputs.orders}
              onChange={(v) => setRTOInputs({ orders: v })}
              showSlider
              sliderMax={5000}
            />
            <NumberInput
              label="RTO Rate"
              value={rtoInputs.rtoRate}
              onChange={(v) => setRTOInputs({ rtoRate: v })}
              suffix="%"
              showSlider
              sliderMax={50}
            />
            <NumberInput
              label="Reverse Shipping"
              value={rtoInputs.reverseShippingCost}
              onChange={(v) => setRTOInputs({ reverseShippingCost: v })}
              prefix="₹"
            />
            <NumberInput
              label="Product Cost"
              value={rtoInputs.productCost}
              onChange={(v) => setRTOInputs({ productCost: v })}
              prefix="₹"
            />
            <NumberInput
              label="Refund Amount"
              value={rtoInputs.refundAmount}
              onChange={(v) => setRTOInputs({ refundAmount: v })}
              prefix="₹"
            />
            <NumberInput
              label="Recovery Rate"
              value={rtoInputs.recoveryRate}
              onChange={(v) => setRTOInputs({ recoveryRate: v })}
              suffix="%"
              showSlider
              sliderMax={100}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <OutputPanel
            title="RTO Loss Breakdown"
            items={[
              { label: "RTO Orders", value: outputs.rtoOrders, format: "number" },
              {
                label: "Reverse Shipping Loss",
                value: outputs.reverseShippingLoss,
                highlight: "loss",
              },
              { label: "Refund Impact", value: outputs.refundImpact, highlight: "loss" },
              { label: "Damage Loss", value: outputs.damageLoss, highlight: "loss" },
              {
                label: "Product Recovery",
                value: outputs.productRecovery,
                highlight: "profit",
              },
              {
                label: "Total RTO Loss",
                value: outputs.totalRTOLoss,
                highlight: "loss",
              },
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Loss Meter
                {outputs.rtoSeverity !== "low" && (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">RTO Severity</span>
                  <span
                    className={cn(
                      "font-medium capitalize",
                      outputs.rtoSeverity === "critical" && "text-red-400",
                      outputs.rtoSeverity === "high" && "text-orange-400"
                    )}
                  >
                    {outputs.rtoSeverity}
                  </span>
                </div>
                <Progress
                  value={lossMeterValue}
                  indicatorClassName={severityColors[outputs.rtoSeverity]}
                />
                <p className="text-xs text-zinc-500">
                  Loss per order: {formatINR(outputs.lossPerOrder)}
                </p>
              </div>
              {rtoInputs.rtoRate >= 20 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  Warning: RTO above 20% significantly impacts profitability.
                  Consider prepaid incentives or stricter COD verification.
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
