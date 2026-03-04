import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from "@tanstack/react-table"
import { FileText, Download, ChevronDown } from "lucide-react";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import InventoryExpand from "./InventoryExpand"

/* ================== TYPE ================== */

export interface InventoryItem {
  id: string
  sku: string
  description: string
  warehouse: string
  onHand: number
  trueAvail: number
  age: number
  status: string
  supplierInfo: {
    reliability: string
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

/* ================== SAMPLE DATA ================== */

const sampleData: InventoryItem[] = [
  {
    id: "1",
    sku: "CD-SAU-30",
    description: "Sauvage EDT 30ml",
    warehouse: "Dubai Main",
    onHand: 540,
    trueAvail: 575,
    age: 8,
    status: "Good",
    supplierInfo: {
      reliability: "High",
      pendingPOsValue: "$120,000",
      lastCost: "$95",
      receivedValue: "$80,000",
      volume: 1200,
      avgCost: "$92",
      costDelta: "-3%",
      skuPendingPO: "350 units",
      skuReceived: "500 units"
    },
    keyCustomers: [
      {
        name: "Paris Gallery LLC",
        qty: 400,
        value: "$38,000",
        holdDays: "12 days"
      }
    ],
    quarterlyHistory: [
      {
        quarter: "Q1 2024",
        stockOnHand: 480,
        consignment: 50,
        poPipeline: 200,
        pendingOrders: 90,
        salesQty: 620
      },
      {
        quarter: "Q2 2024",
        stockOnHand: 520,
        consignment: 60,
        poPipeline: 180,
        pendingOrders: 70,
        salesQty: 710
      }
    ],
    avgHoldingDays: 18
  }
]

/* ================== TABLE ================== */

const columnHelper = createColumnHelper<InventoryItem>()

const columns = [
  columnHelper.accessor("sku", { header: "SKU" }),
  columnHelper.accessor("description", { header: "Description" }),
  columnHelper.accessor("warehouse", { header: "Warehouse" }),
  columnHelper.accessor("onHand", { header: "On Hand" }),
  columnHelper.accessor("trueAvail", { header: "True Avail." }),
  columnHelper.accessor("age", { header: "Age (days)" }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue()
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === "Good"
              ? "bg-green-100 text-green-700"
              : status === "Watch"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>
      )
    }
  })
]

/* ================== PAGE ================== */

const ITEMS_PER_PAGE = 10

const InventoryPage = () => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [page, setPage] = React.useState(1)

  const totalPages = Math.ceil(sampleData.length / ITEMS_PER_PAGE)

  const paginatedData = React.useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return sampleData.slice(start, start + ITEMS_PER_PAGE)
  }, [page])

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className=" space-y-6">
    <div className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gray-100">
          <FileText className="w-5 h-5 text-gray-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">
          Inventory Report
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Generate Offer Button */}
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-lg transition">
          <FileText className="w-4 h-4 text-gray-700" />
          Generate Offer
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>

        {/* Export Button */}
        <button className="flex items-center gap-2 px-4 py-2 border text-sm font-medium rounded-lg hover:bg-gray-50 transition">
          <Download className="w-4 h-4 text-gray-700" />
          Export
        </button>

      </div>
    </div>

       <div className="space-y-6">

      {/* ====== TOP STATS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Stock */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500 tracking-wide">
            TOTAL STOCK UNITS
          </p>
          <h2 className="text-4xl font-semibold mt-2">3,665</h2>
        </div>

        {/* True Available */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500 tracking-wide">
            TRUE AVAILABLE
          </p>
          <h2 className="text-4xl font-semibold mt-2">3,760</h2>
        </div>

        {/* Avg Holding */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500 tracking-wide">
            AVG HOLDING PERIOD
          </p>
          <h2 className="text-4xl font-semibold mt-2 text-orange-500">
            59d
          </h2>
        </div>
      </div>

      {/* ====== ITEMS TO COVER / BUY ====== */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 space-y-4">

        <h3 className="text-orange-600 font-semibold tracking-wide">
          ITEMS TO COVER / BUY
        </h3>

        <div className="bg-white border rounded-xl overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-gray-100 px-6 py-3 text-sm font-medium text-gray-600">
            <div>SKU</div>
            <div>Description</div>
            <div>Net Position</div>
            <div>To Buy</div>
            <div>SO Expiry Alert</div>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-5 px-6 py-4 border-t items-center">
            <div className="font-medium">CD-SAU-50</div>
            <div>Sauvage EDT 50ml</div>
            <div className="text-red-600 font-semibold">-270</div>
            <div className="text-red-600 font-semibold">270</div>
            <div>
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                ORD-5501 · 400u · EXPIRED
              </span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-5 px-6 py-4 border-t items-center">
            <div className="font-medium">HB-BTL-50</div>
            <div>Boss Bottled EDT 50ml</div>
            <div className="text-red-600 font-semibold">-320</div>
            <div className="text-red-600 font-semibold">320</div>
            <div className="text-gray-400">—</div>
          </div>

        </div>
      </div>

      {/* ====== COVERED BUT EXPIRING ====== */}
      <div className="space-y-4">

        <h3 className="text-gray-500 font-semibold tracking-wide">
          COVERED BUT WITH EXPIRING SOs — VALIDATE WITH CUSTOMER
        </h3>

        {/* Item 1 */}
        <div className="flex justify-between items-center bg-white border rounded-xl p-4">
          <div>
            <span className="font-medium">CD-SAU-30</span>
            <span className="ml-3 text-gray-600">
              Sauvage EDT 30ml
            </span>
            <span className="ml-3 text-green-600 font-medium">
              Net: +775
            </span>
          </div>

          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
            ORD-5510 · Rivoli Group · 250u · EXPIRING
          </span>
        </div>

        {/* Item 2 */}
        <div className="flex justify-between items-center bg-white border rounded-xl p-4">
          <div>
            <span className="font-medium">BV-AQA-30</span>
            <span className="ml-3 text-gray-600">
              Aqva Pour Homme 30ml
            </span>
            <span className="ml-3 text-green-600 font-medium">
              Net: +460
            </span>
          </div>

          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
            ORD-5515 · Faces Beauty Stores · 180u · EXPIRING
          </span>
        </div>

        {/* Item 3 */}
        <div className="flex justify-between items-center bg-white border rounded-xl p-4">
          <div>
            <span className="font-medium">HB-BTL-100</span>
            <span className="ml-3 text-gray-600">
              Boss Bottled EDT 100ml
            </span>
            <span className="ml-3 text-green-600 font-medium">
              Net: +350
            </span>
          </div>

          <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
            ORD-5502 · Paris Gallery LLC · 120u · EXPIRED
          </span>
        </div>

      </div>
    </div>
      <div className="bg-white rounded-xl shadow-sm">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-left p-3 border-b">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setSelectedId(
                      selectedId === row.original.id
                        ? null
                        : row.original.id
                    )
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 border-b">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>

                {selectedId === row.original.id && (
                  <tr>
                    <td colSpan={columns.length}>
                      <InventoryExpand item={row.original} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ArrowLeft />
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default InventoryPage