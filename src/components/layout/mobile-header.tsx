"use client";

import Link from "next/link";
import { Menu, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav-items";

interface MobileHeaderProps {
  onMenuOpen: () => void;
}

export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  const pathname = usePathname();
  const current = NAV_ITEMS.find((item) => item.href === pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-white/[0.06] bg-zinc-950/90 px-4 backdrop-blur-xl safe-top lg:hidden">
      <Link
        href="/app/dashboard"
        className="flex items-center gap-2 min-w-0"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <span className="text-sm font-semibold text-zinc-50">
            Profit<span className="text-indigo-400">OS</span>
          </span>
          {current && (
            <p className="truncate text-[10px] text-zinc-500 leading-tight">
              {current.label}
            </p>
          )}
        </div>
      </Link>
      <button
        type="button"
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 active:bg-white/10"
      >
        <Menu className="h-5 w-5 text-zinc-300" />
      </button>
    </header>
  );
}
