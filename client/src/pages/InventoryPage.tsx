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
import ItemsToCover from "../components/Inventory/ItemsToCover";

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
    // Top stats data array
  const topStats = [
  {
    label: "TOTAL STOCK UNITS",
    value: "3,665",
    valueClass: "",
  },
  {
    label: "TRUE AVAILABLE",
    value: "3,760",
    valueClass: "",
  },
  {
    label: "AVG HOLDING PERIOD",
    value: "59d",
    valueClass: "text-orange-500",
  },
];

  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [page, setPage] = React.useState(1)
  const [offerDropdownOpen, setOfferDropdownOpen] = React.useState(false)

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
    <div className="w-full border-b py-2 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-gray-100">
          <FileText className="w-5 h-5 text-gray-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">
          Inventory Report
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">


        {/* Generate Offer Button with Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-1  border-gray-300 border bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-lg transition cursor-pointer"
            onClick={() => setOfferDropdownOpen((prev) => !prev)}
            type="button"
          >
            <FileText className="w-4 h-4 text-gray-700" />
            Generate Offer
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${offerDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <div
            className={`absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 transform ${offerDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
            style={{ willChange: 'opacity, transform' }}
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors duration-150 cursor-pointer"
              onClick={() => setOfferDropdownOpen(false)}
            >
              Stock only
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors duration-150 cursor-pointer"
              onClick={() => setOfferDropdownOpen(false)}
            >
              Stock + consignment
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors duration-150 cursor-pointer"
              onClick={() => setOfferDropdownOpen(false)}
            >
              Stock + consignment + POs
            </button>
          </div>
        </div>

        {/* Export Button */}
        <button className="flex items-center gap-2 px-4 py-1 border text-sm font-medium border-gray-300 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
          <Download className="w-4 h-4 text-gray-700" />
          Export
        </button>

      </div>
    </div>

       <div className="space-y-6">

      {/* ====== TOP STATS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
          {topStats.map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-300 rounded-xl p-3">
              <p className="text-xs text-gray-500 tracking-wide">{stat.label}</p>
              <h2 className={`text-2xl font-semibold mt-1 ${stat.valueClass}`}>{stat.value}</h2>
            </div>
          ))}
      </div>


       <ItemsToCover />

      
     
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