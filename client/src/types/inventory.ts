// src/types/inventory.ts

export interface InventoryItem {
  id: string
  sku: string
  description: string
  warehouse: string
  onHand: number
  trueAvail: number
  age: number
  status: "Good" | "Watch" | "Alert"

  supplierInfo: {
    reliability: "High" | "Medium" | "Low"
    pendingPOsValue: string
    lastCost: string
    receivedValue: string
    volume: number
    avgCost: string
    costDelta: string
    skuPendingPO: string
    skuReceived: string
  }

  keyCustomers: {
    name: string
    qty: number
    value: string
    holdDays: string
  }[]

  quarterlyHistory: {
    quarter: string
    stockOnHand: number
    consignment: number
    poPipeline: number
    pendingOrders: number
    salesQty: number
  }[]

  avgHoldingDays: number
}