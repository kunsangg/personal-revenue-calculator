export type NavModule =
  | "dashboard"
  | "profit-calculator"
  | "rto-returns"
  | "ads-analyzer"
  | "cod-prepaid"
  | "gst-calculator"
  | "shipping"
  | "break-even"
  | "inventory"
  | "scaling"
  | "ai-insights"
  | "settings";

export interface ProfitInputs {
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  reverseShipping: number;
  packaging: number;
  codFee: number;
  gatewayFee: number;
  platformFee: number;
  gstPercent: number;
  adSpend: number;
  discounts: number;
  returnRate: number;
  rtoRate: number;
  refundLosses: number;
  monthlyOrders: number;
}

export interface ProfitOutputs {
  grossProfit: number;
  netProfit: number;
  netMarginPercent: number;
  profitPerOrder: number;
  breakEvenRoas: number;
  monthlyProjectedProfit: number;
  totalCostPerOrder: number;
  revenuePerOrder: number;
}

export interface RTOInputs {
  orders: number;
  rtoRate: number;
  reverseShippingCost: number;
  productCost: number;
  refundAmount: number;
  damageLossPercent: number;
  recoveryRate: number;
}

export interface AdsInputs {
  cpm: number;
  ctr: number;
  cpc: number;
  cac: number;
  conversionRate: number;
  dailyBudget: number;
  aov: number;
  profitPerOrder: number;
}

export interface CODPrepaidInputs {
  orders: number;
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  codFeePercent: number;
  gatewayFeePercent: number;
  codRtoRate: number;
  prepaidRtoRate: number;
  codConversionRate: number;
  prepaidConversionRate: number;
  reverseShipping: number;
}

export interface GSTInputs {
  amount: number;
  gstRate: number;
  isInclusive: boolean;
}

export interface ShippingInputs {
  weight: number;
  zone: 1 | 2 | 3 | 4 | 5;
  isCod: boolean;
  forwardBase: number;
  reverseBase: number;
}

export interface BreakEvenInputs {
  fixedCosts: number;
  variableCostPerOrder: number;
  sellingPrice: number;
  currentAdSpend: number;
  currentOrders: number;
  targetMarginPercent: number;
}

export interface InventoryInputs {
  skuCount: number;
  avgUnitCost: number;
  unitsInStock: number;
  deadStockPercent: number;
  holdingCostPercent: number;
  warehouseLossPercent: number;
  monthlySales: number;
}

export interface ScalingInputs {
  currentDailyBudget: number;
  currentOrders: number;
  profitPerOrder: number;
  scaleMultiplier: number;
  efficiencyDecay: number;
}

export interface Scenario {
  id: string;
  name: string;
  createdAt: string;
  profitInputs: ProfitInputs;
}

export interface Insight {
  id: string;
  type: "warning" | "success" | "info" | "danger";
  title: string;
  message: string;
  priority: number;
}

export interface DashboardMetrics {
  totalRevenue: number;
  netProfit: number;
  grossMargin: number;
  roas: number;
  cac: number;
  rtoPercent: number;
  ordersDelivered: number;
  losses: number;
}

export interface MonthlyDataPoint {
  month: string;
  revenue: number;
  profit: number;
  expenses: number;
  orders: number;
}

export interface ExpenseBreakdown {
  name: string;
  value: number;
  color: string;
}
