"use client";

import { motion } from "framer-motion";
import { cn, formatINR, formatPercent } from "@/lib/utils";

interface OutputItem {
  label: string;
  value: number;
  format?: "currency" | "percent" | "multiplier" | "number";
  highlight?: "profit" | "loss" | "neutral";
}

interface OutputPanelProps {
  title: string;
  items: OutputItem[];
}

export function OutputPanel({ title, items }: OutputPanelProps) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/5 p-6">
      <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-4">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm text-zinc-400">{item.label}</span>
            <span
              className={cn(
                "text-lg font-semibold tabular-nums",
                item.highlight === "profit" && "text-emerald-400",
                item.highlight === "loss" && "text-red-400",
                !item.highlight && "text-zinc-100"
              )}
            >
              {item.format === "percent"
                ? formatPercent(item.value)
                : item.format === "multiplier"
                  ? `${item.value.toFixed(2)}x`
                  : item.format === "number"
                    ? item.value.toLocaleString("en-IN")
                    : formatINR(item.value)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
