import React from "react"
import { useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table"
import { FileText, Download } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import CustomerTable from "../components/customer/CustomerTable";
import InventoryPagination from "../components/Inventory/InventoryPagination";
import type { InventoryItem } from "../types/inventory";

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
        name: "Duty Free DXB",
        qty: 1200,
        value: "$280,000",
        holdDays: "6d hold"
      },
      {
        name: "Rivoli Group",
        qty: 700,
        value: "$174,000",
        holdDays: "10d hold"
      },
      {
        name: "Al Shaya Perfumes",
        qty: 400,
        value: "$110,000",
        holdDays: "10d hold"
      },
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
  },
  {
    id: "2",
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
      const status = info.getValue() as "Good" | "Watch" | "Alert";
      return <StatusBadge status={status} />;
    }
  })
]


const ITEMS_PER_PAGE = 10;

function CustomerReport() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(sampleData.length / ITEMS_PER_PAGE);
  const paginatedData = React.useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return sampleData.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-2 md:py-6 flex flex-col gap-4">
      <div className="space-y-6">
        <div className="w-full border-b py-2 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-gray-100">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Customer Report
            </h1>
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Export Button */}
            <button className="flex items-center gap-2 px-4 py-1 border text-sm font-medium border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <Download className="w-4 h-4 text-gray-700" />
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <CustomerTable
          table={table}
          columns={columns}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <InventoryPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default CustomerReport;