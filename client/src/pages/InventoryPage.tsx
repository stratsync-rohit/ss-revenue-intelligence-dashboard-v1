
import { useAppDispatch, useAppSelector } from "../hooks"
import { setSelectedId } from "../slices/inventorySlice"
import InventoryExpand from "./InventoryExpand"
import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from "@tanstack/react-table"


const sampleData = [
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
      pendingPOs: "$120,000",
      lastCost: "$95"
    },
    keyCustomers: [
      { name: "Paris Gallery LLC", qty: 400 },
      { name: "Rivoli Group", qty: 350 },
      { name: "Al Shaya Perfumes", qty: 200 }
    ]
  },
  {
    id: "2",
    sku: "BV-AQA-30",
    description: "Aqva Pour Homme 30ml",
    warehouse: "Dubai Main",
    onHand: 410,
    trueAvail: 460,
    age: 65,
    status: "Watch",
    supplierInfo: {
      reliability: "Medium",
      pendingPOs: "$142,000",
      lastCost: "$98"
    },
    keyCustomers: [
      { name: "ABC Retailers", qty: 120 },
      { name: "XYZ Stores", qty: 90 }
    ]
  },
  {
    id: "3",
    sku: "BV-ONN-50",
    description: "Omnia Crystalline 50ml",
    warehouse: "Abu Dhabi",
    onHand: 150,
    trueAvail: 150,
    age: 195,
    status: "Alert",
    supplierInfo: {
      reliability: "Low",
      pendingPOs: "$50,000",
      lastCost: "$110"
    },
    keyCustomers: [
      { name: "Luxury Perfumes", qty: 60 }
    ]
  },

  
  {
    id: "4",
    sku: "TF-OMB-50",
    description: "Ombre Leather 50ml",
    warehouse: "Dubai South",
    onHand: 320,
    trueAvail: 350,
    age: 25,
    status: "Good",
    supplierInfo: {
      reliability: "High",
      pendingPOs: "$98,000",
      lastCost: "$140"
    },
    keyCustomers: [
      { name: "Faces Middle East", qty: 210 },
      { name: "Rivoli Group", qty: 130 }
    ]
  },
  {
    id: "5",
    sku: "CH-BLU-100",
    description: "Bleu De Chanel 100ml",
    warehouse: "Sharjah Hub",
    onHand: 275,
    trueAvail: 300,
    age: 48,
    status: "Watch",
    supplierInfo: {
      reliability: "Medium",
      pendingPOs: "$200,000",
      lastCost: "$125"
    },
    keyCustomers: [
      { name: "Paris Gallery LLC", qty: 180 },
      { name: "Lifestyle Stores", qty: 90 }
    ]
  },
  {
    id: "6",
    sku: "DG-LIM-75",
    description: "Light Blue 75ml",
    warehouse: "Dubai Main",
    onHand: 600,
    trueAvail: 650,
    age: 12,
    status: "Good",
    supplierInfo: {
      reliability: "High",
      pendingPOs: "$175,000",
      lastCost: "$88"
    },
    keyCustomers: [
      { name: "Al Tayer Group", qty: 300 },
      { name: "ABC Retailers", qty: 200 }
    ]
  },
  {
    id: "7",
    sku: "YSY-LBR-90",
    description: "Libre 90ml",
    warehouse: "Abu Dhabi",
    onHand: 180,
    trueAvail: 210,
    age: 72,
    status: "Watch",
    supplierInfo: {
      reliability: "Medium",
      pendingPOs: "$85,000",
      lastCost: "$115"
    },
    keyCustomers: [
      { name: "Sephora UAE", qty: 140 }
    ]
  },
  {
    id: "8",
    sku: "PR-LUN-50",
    description: "Luna Rossa 50ml",
    warehouse: "Dubai South",
    onHand: 90,
    trueAvail: 95,
    age: 210,
    status: "Alert",
    supplierInfo: {
      reliability: "Low",
      pendingPOs: "$30,000",
      lastCost: "$105"
    },
    keyCustomers: [
      { name: "Luxury Perfumes", qty: 40 }
    ]
  },
  {
    id: "9",
    sku: "JM-PEO-30",
    description: "Peony & Blush Suede 30ml",
    warehouse: "Sharjah Hub",
    onHand: 220,
    trueAvail: 250,
    age: 18,
    status: "Good",
    supplierInfo: {
      reliability: "High",
      pendingPOs: "$60,000",
      lastCost: "$130"
    },
    keyCustomers: [
      { name: "Faces Middle East", qty: 150 }
    ]
  },
  {
    id: "10",
    sku: "GU-GIL-90",
    description: "Guilty Intense 90ml",
    warehouse: "Dubai Main",
    onHand: 130,
    trueAvail: 145,
    age: 130,
    status: "Watch",
    supplierInfo: {
      reliability: "Medium",
      pendingPOs: "$70,000",
      lastCost: "$108"
    },
    keyCustomers: [
      { name: "Rivoli Group", qty: 95 }
    ]
  },
  {
    id: "11",
    sku: "AR-SWG-50",
    description: "Stronger With You 50ml",
    warehouse: "Abu Dhabi",
    onHand: 75,
    trueAvail: 80,
    age: 240,
    status: "Alert",
    supplierInfo: {
      reliability: "Low",
      pendingPOs: "$25,000",
      lastCost: "$99"
    },
    keyCustomers: [
      { name: "Sephora UAE", qty: 50 }
    ]
  },
  {
    id: "12",
    sku: "MM-BRF-100",
    description: "By The Fireplace 100ml",
    warehouse: "Dubai South",
    onHand: 310,
    trueAvail: 340,
    age: 22,
    status: "Good",
    supplierInfo: {
      reliability: "High",
      pendingPOs: "$150,000",
      lastCost: "$145"
    },
    keyCustomers: [
      { name: "Al Shaya Perfumes", qty: 200 },
      { name: "Lifestyle Stores", qty: 110 }
    ]
  }
]




export const inventoryTableColumns = [
  { accessor: "sku", header: "SKU" },
  { accessor: "description", header: "Description" },
  { accessor: "warehouse", header: "Warehouse" },
  { accessor: "onHand", header: "On Hand" },
  { accessor: "trueAvail", header: "True Avail." },
  { accessor: "age", header: "Age (days)" },
]

const columnsConfig = [
  ...inventoryTableColumns,
  {
    accessor: "status",
    header: "Status",
    cell: (info: any) => {
      const status = info.getValue() as string
      return (
        <span
          className={`status-badge ${
            status === "Good"
              ? "status-good"
              : status === "Watch"
              ? "status-watch"
              : "status-alert"
          }`}
        >
          {status}
        </span>
      )
    }
  }
]

const columnHelper = createColumnHelper<typeof sampleData[0]>()
const columns = columnsConfig.map(col =>
  'cell' in col && col.cell
    ? columnHelper.accessor(col.accessor as any, { header: col.header, cell: col.cell })
    : columnHelper.accessor(col.accessor as any, { header: col.header })
)


const ITEMS_PER_PAGE = 10;

const InventoryPage = () => {
  const dispatch = useAppDispatch();
  const { selectedId } = useAppSelector((state) => state.inventory);

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
    state: {},
  });

  return (
    <div className="inventory-page">
      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="inventory-card">
          <div className="text-sm text-gray-500">TOTAL STOCK UNITS</div>
          <div className="inventory-kpi">3,665</div>
        </div>
        <div className="inventory-card">
          <div className="text-sm text-gray-500">TRUE AVAILABLE</div>
          <div className="inventory-kpi">3,760</div>
        </div>
        <div className="inventory-card">
          <div className="text-sm text-gray-500">AVG HOLDING PERIOD</div>
          <div className="inventory-kpi text-orange-500">59d</div>
        </div>
      </div>

      {/* Main Table */}
      <div className="inventory-card" style={{ paddingBottom: 0 }}>
        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <React.Fragment key={row.id}>
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch(
                        setSelectedId(
                          selectedId === row.original.id ? null : row.original.id
                        )
                      )
                    }
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {selectedId === row.original.id && (
                    <tr>
                      <td colSpan={columns.length}>
                        <div style={{ maxHeight: 250, overflowY: "auto" }}>
                          <InventoryExpand item={row.original} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-footer">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: "4px 12px", borderRadius: 4, border: "1px solid #ccc", background: page === 1 ? "#eee" : "#fff", cursor: page === 1 ? "not-allowed" : "pointer" }}
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{ padding: "4px 12px", borderRadius: 4, border: "1px solid #ccc", background: page === totalPages ? "#eee" : "#fff", cursor: page === totalPages ? "not-allowed" : "pointer" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryPage
