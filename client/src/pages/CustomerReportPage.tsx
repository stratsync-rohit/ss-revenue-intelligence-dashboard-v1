import React from "react"
import { useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table"
import { FileText, Download } from "lucide-react"
import CustomerTable from "../components/customer/CustomerTable"
import PaginationControl from "../components/PaginationControl"
import type { CustomerItem } from "../types/customer"

const columnHelper = createColumnHelper<CustomerItem>()

const columns = [
  columnHelper.accessor("customer", {
    header: "Customer"
  }),
  columnHelper.accessor("qty3m", {
    header: "3M Qty"
  }),
  columnHelper.accessor("qty6m", {
    header: "6M Qty"
  }),
  columnHelper.accessor("ytdValue", {
    header: "YTD Business Value"
  }),
  columnHelper.accessor("pendingOrdersValue", {
    header: "Pending Orders Value"
  }),
  columnHelper.accessor("blockers", {
    header: "Blockers",
    cell: (info) => (
      <span className="text-red-500 text-sm">
        {info.getValue() || "—"}
      </span>
    )
  })
]

const sampleData: CustomerItem[] = [
  {
    id: "1",
    customer: "Paris Gallery LLC",
    qty3m: 3200,
    qty6m: 7400,
    ytdValue: "$798,000",
    pendingOrdersValue: "$124,500",
    blockers: "",

    keyBrands: [
      { brand: "Christian Dior", qty3m: 1600, qty6m: 3800, pendingSO: "$68,000" },
      { brand: "Hugo Boss", qty3m: 1200, qty6m: 2800, pendingSO: "$38,500" },
      { brand: "Bulgari", qty3m: 400, qty6m: 800, pendingSO: "$18,000" }
    ],

    quarterlySales: [
      { brand: "Christian Dior", quarter: "Q1 2025", volume: 1100, value: "$308,000", avgPrice: "$280" },
      { brand: "Hugo Boss", quarter: "Q1 2025", volume: 800, value: "$140,000", avgPrice: "$175" },
      { brand: "Christian Dior", quarter: "Q2 2025", volume: 1250, value: "$356,250", avgPrice: "$285" },
      { brand: "Hugo Boss", quarter: "Q2 2025", volume: 900, value: "$162,000", avgPrice: "$180" }
    ],

    skuPriceHistory: [
      { sku: "CD-SAU-50", quarter: "Q1 2025", price: "$295", qtySold: 400 },
      { sku: "CD-SAU-50", quarter: "Q2 2025", price: "$300", qtySold: 450 },
      { sku: "HB-BTL-30", quarter: "Q3 2025", price: "$162", qtySold: 420 }
    ],

    suggestions: [
      {
        brand: "Christian Dior",
        lastQuarter: "Q4 2025",
        lastVol: 1600,
        growth: "+14.3%",
        projectedVol: 1829,
        projectedValue: "$539,555"
      },
      {
        brand: "Hugo Boss",
        lastQuarter: "Q4 2025",
        lastVol: 1200,
        growth: "+14.3%",
        projectedVol: 1371,
        projectedValue: "$253,635"
      }
    ],

    keySkus: [
      { sku: "CD-SAU-50", description: "Sauvage EDT 50ml", qty3m: 800, qty6m: 1900, pendingValue: "$34,000" },
      { sku: "HB-BTL-30", description: "Boss Bottled EDT 30ml", qty3m: 650, qty6m: 1500, pendingValue: "$18,500" }
    ],

    pendingOrders: [
      {
        order: "ORD-5502",
        sku: "HB-BTL-100",
        description: "Boss Bottled EDT 100ml",
        qty: 120,
        available: 250,
        expiry: "2026-02-08",
        status: "Expired",
        coverage: "Covered"
      }
    ],

    coverItems: [
      {
        sku: "CD-SAU-50",
        description: "Sauvage EDT 50ml",
        brand: "Christian Dior",
        netPosition: -270,
        unitsToBuy: 270,
        supplier: "LVMH Distribution"
      }
    ]
  }
]

const ITEMS_PER_PAGE = 10

function CustomerReport() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [page, setPage] = React.useState(1)

  const table = useReactTable({
    data: sampleData,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center border-b pb-3 mb-4">

        <div className="flex items-center gap-2">
          <FileText size={18} />
          <h1 className="font-semibold text-lg">Customer Report</h1>
        </div>

        <button className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm">
          <Download size={16}/>
          Export
        </button>

      </div>

      <CustomerTable
        table={table}
        columns={columns}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

      <PaginationControl
        page={page}
        totalPages={1}
        setPage={setPage}
      />

    </div>
  )
}

export default CustomerReport