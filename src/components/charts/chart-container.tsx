"use client";

import { cn } from "@/lib/utils";

interface ChartContainerProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
}

/** Responsive chart wrapper — scrolls horizontally on narrow screens */
export function ChartContainer({
  children,
  height = 280,
  className,
}: ChartContainerProps) {
  return (
    <div
      className={cn("chart-scroll w-full min-w-0 -mx-1 px-1", className)}
      style={{ minHeight: height }}
    >
      <div className="w-full min-w-[280px] sm:min-w-0" style={{ height }}>
        {children}
      </div>
    </div>
  );
}
