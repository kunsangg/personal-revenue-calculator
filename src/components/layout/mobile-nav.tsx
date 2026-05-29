"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calculator,
  Sparkles,
  Settings,
  PackageX,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileMenuItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/profit-calculator", label: "Profit", icon: Calculator },
  { href: "/app/rto-returns", label: "RTO", icon: PackageX },
  { href: "/app/ads-analyzer", label: "Ads", icon: Megaphone },
  { href: "/app/ai-insights", label: "Insights", icon: Sparkles },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-4 top-4 z-50 rounded-lg border border-white/10 bg-zinc-900/90 p-2 backdrop-blur"
      >
        <Menu className="h-5 w-5 text-zinc-300" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 z-50 h-full w-72 border-l border-white/10 bg-zinc-950 p-6 pt-16"
            >
              <nav className="space-y-1">
                {mobileMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm",
                        pathname === item.href
                          ? "bg-indigo-500/15 text-indigo-300"
                          : "text-zinc-400"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
