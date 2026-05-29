"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProfitStore } from "@/store/use-profit-store";
import { NAV_ITEMS } from "@/lib/nav-items";

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
              {NAV_ITEMS.map((item) => {
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
                type="button"
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

      {sidebarCollapsed && (
        <button
          type="button"
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 hidden rounded-lg border border-white/10 bg-zinc-900 p-2 lg:block"
          aria-label="Expand sidebar"
        >
          <ChevronLeft className="h-4 w-4 rotate-180 text-zinc-400" />
        </button>
      )}
    </>
  );
}
