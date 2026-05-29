"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn, formatINR, formatPercent } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  title: string;
  value: number;
  format?: "currency" | "percent" | "number" | "multiplier";
  change?: number;
  tooltip?: string;
  variant?: "default" | "profit" | "loss";
  compact?: boolean;
}

export function MetricCard({
  title,
  value,
  format = "currency",
  change,
  tooltip,
  variant = "default",
  compact,
}: MetricCardProps) {
  const formatted =
    format === "currency"
      ? formatINR(value, compact)
      : format === "percent"
        ? formatPercent(value)
        : format === "multiplier"
          ? `${value.toFixed(2)}x`
          : value.toLocaleString("en-IN");

  const content = (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-white/15 hover:bg-white/[0.05]",
        variant === "profit" && "border-emerald-500/20",
        variant === "loss" && "border-red-500/20"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {title}
      </p>
      <p
        className={cn(
          "mt-2 text-2xl font-semibold tracking-tight text-zinc-50",
          variant === "profit" && "text-emerald-400",
          variant === "loss" && "text-red-400"
        )}
      >
        {formatted}
      </p>
      {change !== undefined && (
        <div
          className={cn(
            "mt-2 flex items-center gap-1 text-xs font-medium",
            change >= 0 ? "text-emerald-400" : "text-red-400"
          )}
        >
          {change >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {Math.abs(change).toFixed(1)}% vs last month
        </div>
      )}
    </motion.div>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
