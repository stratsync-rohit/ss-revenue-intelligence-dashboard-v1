import React from "react"
// import { InventoryItem } from "../types/inventory"

// interface InventoryExpandProps {
//   item: InventoryItem
// }

interface InventoryItem {
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

const InventoryExpand: React.FC<InventoryExpandProps> = ({ item }) => {
  const latest =
    item.quarterlyHistory[item.quarterlyHistory.length - 1] ?? {
      consignment: 0,
      pendingOrders: 0,
      poPipeline: 0
    }

  return (
    <div className="space-y-6 p-6 bg-gray-100 rounded-2xl">
      {/* TOP GRID */}
      <div className="grid grid-cols-2 gap-6">
        {/* SUPPLIER */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm tracking-wide font-semibold text-gray-500 mb-4">
            SUPPLIER — {item.warehouse}
          </h3>

          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <p>Reliability</p>
            <p className="text-green-600 font-medium">
              {item.supplierInfo.reliability}
            </p>

            <p>Last Cost</p>
            <p className="text-right">{item.supplierInfo.lastCost}</p>

            <p>Pending POs</p>
            <p className="text-right">
              {item.supplierInfo.pendingPOsValue}
            </p>

            <p>Received</p>
            <p className="text-right text-green-600">
              {item.supplierInfo.receivedValue}
            </p>
          </div>

          <hr className="my-4" />

          <h4 className="text-xs tracking-wide text-gray-400 mb-3">
            SKU-LEVEL FROM SUPPLIER
          </h4>

          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <p>Volume</p>
            <p className="text-right">{item.supplierInfo.volume}</p>

            <p>Avg Cost</p>
            <p className="text-right">{item.supplierInfo.avgCost}</p>

            <p>Cost Δ</p>
            <p className="text-right text-red-500">
              {item.supplierInfo.costDelta}
            </p>

            <p>Pending PO</p>
            <p className="text-right">
              {item.supplierInfo.skuPendingPO}
            </p>

            <p>Received</p>
            <p className="text-right text-green-600">
              {item.supplierInfo.skuReceived}
            </p>
          </div>
        </div>

        {/* KEY CUSTOMERS */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-sm tracking-wide font-semibold text-gray-500 mb-4">
            KEY CUSTOMERS — {item.sku}
          </h3>

          {item.keyCustomers.map((c, idx) => (
            <div
              key={idx}
              className="flex justify-between py-2 border-b text-sm"
            >
              <div>
                <p>{c.name}</p>
              </div>

              <div className="text-right">
                <p>{c.qty} qty</p>
                <p className="text-green-600">{c.value}</p>
                <p className="text-gray-400">{c.holdDays}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUARTERLY TABLE */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-sm tracking-wide font-semibold text-gray-500 mb-4">
          QUARTERLY STOCK HISTORY — {item.sku}
        </h3>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Quarter</th>
              <th>Stock</th>
              <th>Consignment</th>
              <th>PO</th>
              <th>Pending</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {item.quarterlyHistory.map((q, idx) => (
              <tr key={idx} className="border-b text-center">
                <td className="text-left py-2">{q.quarter}</td>
                <td>{q.stockOnHand}</td>
                <td>{q.consignment}</td>
                <td>{q.poPipeline}</td>
                <td>{q.pendingOrders}</td>
                <td className="font-semibold">{q.salesQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STOCK BREAKDOWN */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between mb-4">
          <h3 className="text-sm tracking-wide font-semibold text-gray-500">
            STOCK BREAKDOWN
          </h3>
          <p className="text-green-600 text-sm">
            Avg Holding: {item.avgHoldingDays} days
          </p>
        </div>

        <div className="grid grid-cols-5 text-center">
          <div>
            <p className="text-xs text-gray-400">ON HAND</p>
            <p className="text-lg font-semibold">{item.onHand}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">CONSIGNMENT</p>
            <p className="text-lg font-semibold">{latest.consignment}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">PENDING</p>
            <p className="text-lg font-semibold">{latest.pendingOrders}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">PO</p>
            <p className="text-lg font-semibold">{latest.poPipeline}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">AGE</p>
            <p className="text-lg font-semibold">{item.age}d</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventoryExpand