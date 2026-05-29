"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useProfitStore } from "@/store/use-profit-store";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarCollapsed = useProfitStore((s) => s.sidebarCollapsed);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen gradient-mesh">
        <Sidebar />
        <MobileNav />
        <main
          className={`min-h-screen pb-20 transition-all lg:pb-0 ${
            sidebarCollapsed ? "lg:pl-0" : "lg:pl-64"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
