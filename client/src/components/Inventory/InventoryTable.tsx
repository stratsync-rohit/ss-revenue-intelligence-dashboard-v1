import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { flexRender } from "@tanstack/react-table";
import InventoryExpand from "./InventoryExpand";
import type { InventoryItem } from "../../types/inventory";
import { ChevronRight } from "lucide-react";
import ActionDropdown from "./ActionDropdown";

interface InventoryTableProps {
  table: any;
  columns: any;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  table,
  columns,
  selectedId,
  setSelectedId,
}) => (
  <div className="rounded-lg border border-gray-300 overflow-x-auto overflow-y-visible w-full">
    <table className="min-w-[700px] w-full text-xs md:text-sm">
      {/* HEADER */}
      <thead className="bg-gray-100 border border-gray-300 text-gray-600">
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id}>
            <th className="w-8 p-0 border-b"></th>

            {headerGroup.headers.map((header: any) => (
              <th
                key={header.id}
                className="text-left font-medium px-2 py-2 border-b "
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}

            <th className="px-4 py-3 border-b text-right">Action</th>
          </tr>
        ))}
      </thead>

      {/* BODY */}
      <tbody>   
        {table.getRowModel().rows.map((row: any) => (
          <React.Fragment key={row.id}>
            <tr
              className="hover:bg-gray-50 border-b cursor-pointer border-gray-300 transition"
              onClick={() =>
                setSelectedId(
                  selectedId === row.original.id ? null : row.original.id
                )
              }
            >
              {/* Expand Arrow */}
              <td className="px-2 py-2">
                <ChevronRight
                  size={14}
                  className={`transition ${
                    selectedId === row.original.id ? "rotate-90" : ""
                  }`}
                />
              </td>

              {/* Cells */}
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className="px-2 text-gray-700">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}

              {/* Action */}
              <td className="px-2 py-2 text-right">
                <ActionDropdown />
              </td>
            </tr>

            {/* Expanded Row */}
            <AnimatePresence initial={false}>
              {selectedId === row.original.id && (
                <tr>
                  <td colSpan={columns.length + 2} className="p-2 !border-b-0" style={{ padding: 0, background: 'transparent' }}>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="p-2">
                        <InventoryExpand item={row.original} />
                      </div>
                    </motion.div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export default InventoryTable;