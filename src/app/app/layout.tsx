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
      <div className="min-h-screen min-h-[100dvh] gradient-mesh">
        <Sidebar />
        <MobileNav />
        <main
          className={`min-h-screen min-h-[100dvh] transition-all
            pt-[calc(3.5rem+env(safe-area-inset-top,0px))]
            pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))]
            lg:pt-0 lg:pb-0
            ${sidebarCollapsed ? "lg:pl-0" : "lg:pl-64"}`}
        >
          <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
