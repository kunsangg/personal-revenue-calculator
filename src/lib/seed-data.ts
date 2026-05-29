import type {
  DashboardMetrics,
  ExpenseBreakdown,
  MonthlyDataPoint,
  ProfitInputs,
} from "@/types";

export const defaultProfitInputs: ProfitInputs = {
  sellingPrice: 1299,
  productCost: 450,
  shippingCost: 65,
  reverseShipping: 55,
  packaging: 15,
  codFee: 2,
  gatewayFee: 2,
  platformFee: 0,
  gstPercent: 18,
  adSpend: 85000,
  discounts: 5,
  returnRate: 8,
  rtoRate: 22,
  refundLosses: 200,
  monthlyOrders: 1200,
};

export const seedDashboardMetrics: DashboardMetrics = {
  totalRevenue: 1558800,
  netProfit: 312450,
  grossMargin: 42.5,
  roas: 3.2,
  cac: 285,
  rtoPercent: 22,
  ordersDelivered: 936,
  losses: 89400,
};

export const seedMonthlyData: MonthlyDataPoint[] = [
  { month: "Jan", revenue: 980000, profit: 156000, expenses: 824000, orders: 820 },
  { month: "Feb", revenue: 1120000, profit: 198000, expenses: 922000, orders: 940 },
  { month: "Mar", revenue: 1280000, profit: 245000, expenses: 1035000, orders: 1050 },
  { month: "Apr", revenue: 1350000, profit: 268000, expenses: 1082000, orders: 1100 },
  { month: "May", revenue: 1420000, profit: 289000, expenses: 1131000, orders: 1150 },
  { month: "Jun", revenue: 1558800, profit: 312450, expenses: 1246350, orders: 1200 },
];

export const seedExpenseBreakdown: ExpenseBreakdown[] = [
  { name: "Product COGS", value: 540000, color: "#6366f1" },
  { name: "Ad Spend", value: 85000, color: "#8b5cf6" },
  { name: "Shipping", value: 78000, color: "#a78bfa" },
  { name: "RTO Losses", value: 62000, color: "#ef4444" },
  { name: "Returns", value: 27400, color: "#f87171" },
  { name: "Platform & Fees", value: 45000, color: "#64748b" },
  { name: "Packaging", value: 18000, color: "#94a3b8" },
];

export const exampleScenarios = [
  {
    id: "scenario-1",
    name: "Festive Sale — Aggressive Ads",
    createdAt: "2026-05-01T10:00:00Z",
    profitInputs: {
      ...defaultProfitInputs,
      adSpend: 150000,
      discounts: 15,
      monthlyOrders: 2000,
    },
  },
  {
    id: "scenario-2",
    name: "Prepaid Push — Lower RTO",
    createdAt: "2026-05-15T14:30:00Z",
    profitInputs: {
      ...defaultProfitInputs,
      rtoRate: 12,
      codFee: 0,
      gatewayFee: 2.5,
      monthlyOrders: 1100,
    },
  },
];

export const landingStats = [
  { label: "Metrics Tracked", value: "50+", suffix: "" },
  { label: "Indian Sellers", value: "10K", suffix: "+" },
  { label: "Profit Calculated", value: "₹100", suffix: "Cr+" },
  { label: "Avg. Margin Boost", value: "18", suffix: "%" },
];
