"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ProfitInputs,
  RTOInputs,
  AdsInputs,
  CODPrepaidInputs,
  GSTInputs,
  ShippingInputs,
  BreakEvenInputs,
  InventoryInputs,
  ScalingInputs,
  Scenario,
} from "@/types";
import { defaultProfitInputs, exampleScenarios } from "@/lib/seed-data";
import { generateId } from "@/lib/utils";

interface ProfitStore {
  profitInputs: ProfitInputs;
  rtoInputs: RTOInputs;
  adsInputs: AdsInputs;
  codPrepaidInputs: CODPrepaidInputs;
  gstInputs: GSTInputs;
  shippingInputs: ShippingInputs;
  breakEvenInputs: BreakEvenInputs;
  inventoryInputs: InventoryInputs;
  scalingInputs: ScalingInputs;
  scenarios: Scenario[];
  sidebarCollapsed: boolean;
  setProfitInputs: (inputs: Partial<ProfitInputs>) => void;
  setRTOInputs: (inputs: Partial<RTOInputs>) => void;
  setAdsInputs: (inputs: Partial<AdsInputs>) => void;
  setCODPrepaidInputs: (inputs: Partial<CODPrepaidInputs>) => void;
  setGSTInputs: (inputs: Partial<GSTInputs>) => void;
  setShippingInputs: (inputs: Partial<ShippingInputs>) => void;
  setBreakEvenInputs: (inputs: Partial<BreakEvenInputs>) => void;
  setInventoryInputs: (inputs: Partial<InventoryInputs>) => void;
  setScalingInputs: (inputs: Partial<ScalingInputs>) => void;
  saveScenario: (name: string) => void;
  loadScenario: (id: string) => void;
  deleteScenario: (id: string) => void;
  toggleSidebar: () => void;
  resetToDefaults: () => void;
}

const defaultRTO: RTOInputs = {
  orders: 1200,
  rtoRate: 22,
  reverseShippingCost: 55,
  productCost: 450,
  refundAmount: 200,
  damageLossPercent: 5,
  recoveryRate: 30,
};

const defaultAds: AdsInputs = {
  cpm: 180,
  ctr: 1.2,
  cpc: 12,
  cac: 285,
  conversionRate: 2.5,
  dailyBudget: 3500,
  aov: 1299,
  profitPerOrder: 260,
};

const defaultCOD: CODPrepaidInputs = {
  orders: 1200,
  sellingPrice: 1299,
  productCost: 450,
  shippingCost: 65,
  codFeePercent: 2,
  gatewayFeePercent: 2,
  codRtoRate: 25,
  prepaidRtoRate: 8,
  codConversionRate: 85,
  prepaidConversionRate: 72,
  reverseShipping: 55,
};

const defaultGST: GSTInputs = {
  amount: 1299,
  gstRate: 18,
  isInclusive: true,
};

const defaultShipping: ShippingInputs = {
  weight: 0.5,
  zone: 3,
  isCod: true,
  forwardBase: 55,
  reverseBase: 50,
};

const defaultBreakEven: BreakEvenInputs = {
  fixedCosts: 50000,
  variableCostPerOrder: 680,
  sellingPrice: 1299,
  currentAdSpend: 85000,
  currentOrders: 1200,
  targetMarginPercent: 20,
};

const defaultInventory: InventoryInputs = {
  skuCount: 45,
  avgUnitCost: 450,
  unitsInStock: 2400,
  deadStockPercent: 12,
  holdingCostPercent: 18,
  warehouseLossPercent: 2,
  monthlySales: 1200,
};

const defaultScaling: ScalingInputs = {
  currentDailyBudget: 3500,
  currentOrders: 40,
  profitPerOrder: 260,
  scaleMultiplier: 2,
  efficiencyDecay: 8,
};

export const useProfitStore = create<ProfitStore>()(
  persist(
    (set, get) => ({
      profitInputs: defaultProfitInputs,
      rtoInputs: defaultRTO,
      adsInputs: defaultAds,
      codPrepaidInputs: defaultCOD,
      gstInputs: defaultGST,
      shippingInputs: defaultShipping,
      breakEvenInputs: defaultBreakEven,
      inventoryInputs: defaultInventory,
      scalingInputs: defaultScaling,
      scenarios: exampleScenarios,
      sidebarCollapsed: false,

      setProfitInputs: (inputs) =>
        set((s) => ({ profitInputs: { ...s.profitInputs, ...inputs } })),
      setRTOInputs: (inputs) =>
        set((s) => ({ rtoInputs: { ...s.rtoInputs, ...inputs } })),
      setAdsInputs: (inputs) =>
        set((s) => ({ adsInputs: { ...s.adsInputs, ...inputs } })),
      setCODPrepaidInputs: (inputs) =>
        set((s) => ({ codPrepaidInputs: { ...s.codPrepaidInputs, ...inputs } })),
      setGSTInputs: (inputs) =>
        set((s) => ({ gstInputs: { ...s.gstInputs, ...inputs } })),
      setShippingInputs: (inputs) =>
        set((s) => ({ shippingInputs: { ...s.shippingInputs, ...inputs } })),
      setBreakEvenInputs: (inputs) =>
        set((s) => ({ breakEvenInputs: { ...s.breakEvenInputs, ...inputs } })),
      setInventoryInputs: (inputs) =>
        set((s) => ({ inventoryInputs: { ...s.inventoryInputs, ...inputs } })),
      setScalingInputs: (inputs) =>
        set((s) => ({ scalingInputs: { ...s.scalingInputs, ...inputs } })),

      saveScenario: (name) => {
        const scenario: Scenario = {
          id: generateId(),
          name,
          createdAt: new Date().toISOString(),
          profitInputs: get().profitInputs,
        };
        set((s) => ({ scenarios: [scenario, ...s.scenarios] }));
      },

      loadScenario: (id) => {
        const scenario = get().scenarios.find((s) => s.id === id);
        if (scenario) set({ profitInputs: scenario.profitInputs });
      },

      deleteScenario: (id) =>
        set((s) => ({ scenarios: s.scenarios.filter((sc) => sc.id !== id) })),

      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      resetToDefaults: () =>
        set({
          profitInputs: defaultProfitInputs,
          rtoInputs: defaultRTO,
          adsInputs: defaultAds,
        }),
    }),
    { name: "profitos-storage" }
  )
);
