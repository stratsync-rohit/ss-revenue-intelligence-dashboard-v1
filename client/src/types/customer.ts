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
  }[]

  suggestions: {
    brand: string
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
  }[]
}