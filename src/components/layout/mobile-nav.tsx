"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { MoreHorizontal, X } from "lucide-react";
import { NAV_ITEMS, MOBILE_PRIMARY_NAV } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { MobileHeader } from "./mobile-header";

export function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isMoreActive = !MOBILE_PRIMARY_NAV.some((item) => item.href === pathname);

  return (
    <div className="lg:hidden">
      <MobileHeader onMenuOpen={() => setDrawerOpen(true)} />

      {/* Full navigation drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100vw,320px)] flex-col border-l border-white/10 bg-zinc-950 safe-top safe-bottom"
              role="dialog"
              aria-label="Navigation menu"
            >
              <div className="flex h-14 items-center justify-between border-b border-white/[0.06] px-4">
                <span className="text-sm font-semibold text-zinc-200">All modules</span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5"
                >
                  <X className="h-5 w-5 text-zinc-400" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto overscroll-contain p-3 space-y-0.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "flex min-h-[48px] items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium touch-manipulation",
                        isActive
                          ? "bg-indigo-500/15 text-indigo-300"
                          : "text-zinc-400 active:bg-white/10"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-xl safe-bottom lg:hidden"
        aria-label="Primary navigation"
      >
        {MOBILE_PRIMARY_NAV.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] touch-manipulation",
                isActive ? "text-indigo-400" : "text-zinc-500 active:text-zinc-300"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-indigo-400")} />
              <span className="text-[10px] font-medium leading-none">
                {item.shortLabel}
              </span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] touch-manipulation",
            isMoreActive ? "text-indigo-400" : "text-zinc-500"
          )}
          aria-label="More modules"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-[10px] font-medium leading-none">More</span>
        </button>
      </nav>
    </div>
  );
}
