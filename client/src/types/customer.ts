export interface CustomerItem {
  id: string
  customer: string
  qty3m: number
  qty6m: number
  ytdValue: string
  pendingOrdersValue: string
  blockers?: string

  keyBrands: {
    brand: string
    qty3m: number
    qty6m: number
    pendingSO: string
  }[]

  quarterlySales: {
    brand: string
    quarter: string
    volume: number
    value: string
    avgPrice: string
  }[]

  skuPriceHistory: {
    sku: string
    quarter: string
    price: string
    qtySold: number
  }[]

  suggestions: {
    brand: string
    lastQuarter: string
    lastVol: number
    growth: string
    projectedVol: number
    projectedValue: string
  }[]

  keySkus: {
    sku: string
    description: string
    qty3m: number
    qty6m: number
    pendingValue: string
  }[]

  pendingOrders: {
    order: string
    sku: string
    description: string
    qty: number
    available: number
    expiry: string
    status: string
    coverage: string
  }[]

  coverItems: {
    sku: string
    description: string
    brand: string
    netPosition: number
    unitsToBuy: number
    supplier: string
  }[]
}