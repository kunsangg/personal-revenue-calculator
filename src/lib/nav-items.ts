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
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  mobilePrimary?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/app/dashboard", label: "Dashboard", shortLabel: "Home", icon: LayoutDashboard, mobilePrimary: true },
  { href: "/app/profit-calculator", label: "Profit Calculator", shortLabel: "Profit", icon: Calculator, mobilePrimary: true },
  { href: "/app/rto-returns", label: "RTO & Returns", shortLabel: "RTO", icon: PackageX },
  { href: "/app/ads-analyzer", label: "Ads Analyzer", shortLabel: "Ads", icon: Megaphone, mobilePrimary: true },
  { href: "/app/cod-prepaid", label: "COD vs Prepaid", shortLabel: "COD", icon: CreditCard },
  { href: "/app/gst-calculator", label: "GST Calculator", shortLabel: "GST", icon: Receipt },
  { href: "/app/shipping", label: "Shipping", shortLabel: "Ship", icon: Truck },
  { href: "/app/break-even", label: "Break-even", shortLabel: "Break", icon: Target },
  { href: "/app/inventory", label: "Inventory", shortLabel: "Stock", icon: Boxes },
  { href: "/app/scaling", label: "Scaling Simulator", shortLabel: "Scale", icon: TrendingUp },
  { href: "/app/ai-insights", label: "AI Insights", shortLabel: "Insights", icon: Sparkles, mobilePrimary: true },
  { href: "/app/settings", label: "Settings", shortLabel: "Settings", icon: Settings },
];

export const MOBILE_PRIMARY_NAV = NAV_ITEMS.filter((item) => item.mobilePrimary);
