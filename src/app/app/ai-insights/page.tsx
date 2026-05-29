"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  XCircle,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfitStore } from "@/store/use-profit-store";
import { generateInsights } from "@/lib/insights";
import { cn } from "@/lib/utils";
import type { Insight } from "@/types";

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
  danger: XCircle,
};

const colorMap = {
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  info: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
  danger: "border-red-500/20 bg-red-500/10 text-red-300",
};

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const Icon = iconMap[insight.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={cn(
        "rounded-xl border p-5",
        colorMap[insight.type]
      )}
    >
      <div className="flex gap-3">
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold">{insight.title}</h3>
          <p className="mt-1 text-sm opacity-90">{insight.message}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AIInsightsPage() {
  const { profitInputs, rtoInputs, adsInputs } = useProfitStore();
  const insights = useMemo(
    () => generateInsights(profitInputs, rtoInputs, adsInputs),
    [profitInputs, rtoInputs, adsInputs]
  );

  return (
    <div>
      <PageHeader
        title="AI Insights"
        description="Rule-based intelligence analyzing your metrics — RTO, CAC, ROAS, and scaling readiness."
        actions={
          <span className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by ProfitOS Engine
          </span>
        }
      />

      <Card className="mb-6 border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-violet-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            {insights.length} Active Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-400">
            Insights update in real-time as you adjust calculator inputs across modules.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight, i) => (
          <InsightCard key={insight.id} insight={insight} index={i} />
        ))}
      </div>
    </div>
  );
}
