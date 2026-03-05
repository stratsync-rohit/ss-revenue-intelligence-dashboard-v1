import React from "react";
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
  <div className="rounded-lg border border-gray-200 overflow-hidden">
    <table className="w-full text-xs">
      {/* HEADER */}
      <thead className="bg-gray-100 text-gray-600">
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id}>
            <th className="w-8 p-0"></th>

            {headerGroup.headers.map((header: any) => (
              <th
                key={header.id}
                className="text-left font-medium px-2 py-2 border-b"
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
              className="hover:bg-gray-50 transition cursor-pointer"
              onClick={() =>
                setSelectedId(
                  selectedId === row.original.id ? null : row.original.id
                )
              }
            >
              {/* Expand Arrow */}
              <td className="px-2 py-2 border-b">
                <ChevronRight
                  size={14}
                  className={`transition ${
                    selectedId === row.original.id ? "rotate-90" : ""
                  }`}
                />
              </td>

              {/* Cells */}
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className="px-2 py-2 border-b text-gray-700">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}

              {/* Action */}
              <td className="px-2 py-2 border-b text-right">
                <ActionDropdown />
              </td>
            </tr>

            {/* Expanded Row */}
            {selectedId === row.original.id && (
              <tr>
                <td colSpan={columns.length + 2} className="p-2">
                  <InventoryExpand item={row.original} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export default InventoryTable;