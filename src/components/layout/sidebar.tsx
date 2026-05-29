"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calculator,
  PackageX,
  Megaphone,
  CreditCard,
  Receipt,
  Truck,
  Target,
  Boxes,
  TrendingUp,
  Sparkles,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfitStore } from "@/store/use-profit-store";

const navItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/profit-calculator", label: "Profit Calculator", icon: Calculator },
  { href: "/app/rto-returns", label: "RTO & Returns", icon: PackageX },
  { href: "/app/ads-analyzer", label: "Ads Analyzer", icon: Megaphone },
  { href: "/app/cod-prepaid", label: "COD vs Prepaid", icon: CreditCard },
  { href: "/app/gst-calculator", label: "GST Calculator", icon: Receipt },
  { href: "/app/shipping", label: "Shipping", icon: Truck },
  { href: "/app/break-even", label: "Break-even", icon: Target },
  { href: "/app/inventory", label: "Inventory", icon: Boxes },
  { href: "/app/scaling", label: "Scaling Simulator", icon: TrendingUp },
  { href: "/app/ai-insights", label: "AI Insights", icon: Sparkles },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useProfitStore();

  return (
    <>
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.06] bg-zinc-950/80 backdrop-blur-2xl lg:flex"
          >
            <div className="flex h-16 items-center gap-2 border-b border-white/[0.06] px-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-zinc-50">
                Profit<span className="text-indigo-400">OS</span>
              </span>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-indigo-500/15 text-indigo-300 shadow-sm shadow-indigo-500/10"
                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-indigo-400" : ""
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/[0.06] p-4">
              <button
                onClick={toggleSidebar}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              >
                <ChevronLeft className="h-4 w-4" />
                Collapse
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl lg:hidden overflow-x-auto">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 min-w-[64px] flex-col items-center gap-1 py-3 text-[10px]",
                isActive ? "text-indigo-400" : "text-zinc-500"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="truncate px-1">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

      {sidebarCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 hidden rounded-lg border border-white/10 bg-zinc-900 p-2 lg:block"
        >
          <ChevronLeft className="h-4 w-4 rotate-180 text-zinc-400" />
        </button>
      )}
    </>
  );
}
