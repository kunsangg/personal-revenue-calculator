import type { InventoryInputs } from "@/types";

export interface InventoryOutputs {
  inventoryValue: number;
  deadStockValue: number;
  holdingCosts: number;
  warehouseLoss: number;
  turnoverRatio: number;
  daysOfInventory: number;
  totalCarryingCost: number;
}

export function calculateInventory(inputs: InventoryInputs): InventoryOutputs {
  const {
    avgUnitCost,
    unitsInStock,
    deadStockPercent,
    holdingCostPercent,
    warehouseLossPercent,
    monthlySales,
  } = inputs;

  const inventoryValue = avgUnitCost * unitsInStock;
  const deadStockValue = inventoryValue * (deadStockPercent / 100);
  const holdingCosts = inventoryValue * (holdingCostPercent / 100) / 12;
  const warehouseLoss = inventoryValue * (warehouseLossPercent / 100);
  const turnoverRatio = inventoryValue > 0 ? monthlySales / inventoryValue : 0;
  const daysOfInventory =
    monthlySales > 0 ? (unitsInStock / monthlySales) * 30 : 0;
  const totalCarryingCost = holdingCosts + warehouseLoss + deadStockValue * 0.01;

  return {
    inventoryValue,
    deadStockValue,
    holdingCosts,
    warehouseLoss,
    turnoverRatio,
    daysOfInventory,
    totalCarryingCost,
  };
}
