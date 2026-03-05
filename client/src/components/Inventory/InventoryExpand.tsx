import React from "react"
import { Truck, Users, History } from "lucide-react"

interface InventoryExpandProps {
  item: InventoryItem
}

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
    <div className="space-y-4 p-4 bg-gray-50 rounded-xl">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* SUPPLIER */}
        <div className="bg-white border border-gray-300 rounded-xl p-4 mb-4 md:mb-0">
    
          <div className="flex items-center gap-2 mb-4">
            <Truck size={18} className="text-gray-500"/>
            <h3 className="text-sm font-semibold tracking-wide text-gray-600">
              SUPPLIER — {item.warehouse}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-x-6 text-sm">
            {/* First column */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Reliability</p>
                <p className="text-green-600 font-medium">{item.supplierInfo.reliability}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Last Cost</p>
                <p className="text-right font-medium">{item.supplierInfo.lastCost}</p>
              </div>
            </div>
            {/* Second column */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Pending POs</p>
                <p className="text-right">{item.supplierInfo.pendingPOsValue}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Received</p>
                <p className="text-right text-green-600">{item.supplierInfo.receivedValue}</p>
              </div>
            </div>
          </div>

          <hr className="my-4 text-gray-300"/>

          <h4 className="text-xs text-gray-400 tracking-wide mb-3">
            SKU-LEVEL FROM SUPPLIER
          </h4>


          <div className="grid grid-cols-2 gap-x-6 text-sm">
            {/* First column */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Volume</p>
                <p className="text-right">{item.supplierInfo.volume}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Last Cost</p>
                <p className="text-right">{item.supplierInfo.lastCost}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Avg Cost</p>
                <p className="text-right">{item.supplierInfo.avgCost}</p>
              </div>
            </div>
            {/* Second column */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Cost Δ</p>
                <p className="text-right text-red-500">{item.supplierInfo.costDelta}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Pending PO</p>
                <p className="text-right">{item.supplierInfo.skuPendingPO}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Received</p>
                <p className="text-right text-green-600">{item.supplierInfo.skuReceived}</p>
              </div>
            </div>
          </div>

        </div>


        {/* KEY CUSTOMERS */}
        <div className="bg-white border rounded-xl p-4 border-gray-300">

          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-gray-500"/>
            <h3 className="text-sm font-semibold tracking-wide text-gray-600">
              KEY CUSTOMERS — {item.sku}
            </h3>
          </div>

          {item.keyCustomers.map((c, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 text-sm items-center pt-2"
            >
              <p>{c.name}</p>
              <p className="text-center">{c.qty} qty</p>
              <div className="text-right">
                <span className="text-green-600">{c.value}</span>
                <span className="text-gray-400 text-xs ml-2">{c.holdDays}</span>
              </div>
            </div>
          ))}

        </div>

      </div>


      {/* QUARTERLY STOCK HISTORY */}
      <div className="bg-white border border-gray-300 rounded-xl p-4 overflow-x-auto">

        <div className="flex items-center gap-2 mb-3">
          <History size={18} className="text-gray-500"/>
          <h3 className="text-sm font-semibold tracking-wide text-gray-600">
            QUARTERLY STOCK HISTORY — {item.sku}
          </h3>
        </div>

        <div className="overflow-hidden rounded-[4px] min-w-[600px]">
          <table className="w-full text-sm ">

          <thead className="bg-gray-100 text-gray-500">
            <tr>
              <th className="text-left py-2 px-2">Quarter</th>
              <th>Stock on Hand</th>
              <th>Consignment</th>
              <th>PO Pipeline</th>
              <th>Pending Orders</th>
              <th>Sales Qty</th>
            </tr>
          </thead>

          <tbody>

            {item.quarterlyHistory.map((q, idx) => (
              <tr key={idx} className="border border-gray-200 rounded-[4px] text-center">

                <td className="text-left py-2 px-2">{q.quarter}</td>

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
      </div>


      {/* STOCK BREAKDOWN */}
      <div className="bg-white border border-gray-300 rounded-xl p-4 mt-4">

        <div className="flex justify-between mb-4">
          <h3 className="text-sm font-semibold tracking-wide text-gray-600">
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
            <p className="text-xs text-gray-400">PENDING ORDERS</p>
            <p className="text-lg font-semibold">{latest.pendingOrders}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">PO PIPELINE</p>
            <p className="text-lg font-semibold">{latest.poPipeline}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">STOCK AGE</p>
            <p className="text-lg font-semibold">{item.age}d</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default InventoryExpand