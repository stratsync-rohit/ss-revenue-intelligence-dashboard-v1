import React from "react";
import { flexRender } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

interface ExpandableTableProps {
  table: any;
  columns: any;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  ExpandComponent: React.ComponentType<{ row: any }>;
  renderExtraColumns?: (row: any) => React.ReactNode;
  extraHeader?: React.ReactNode;
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({
  table,
  columns,
  selectedId,
  setSelectedId,
  ExpandComponent,
  renderExtraColumns,
  extraHeader,
}) => (
  <div className="rounded-lg border border-gray-300 overflow-x-auto overflow-y-visible w-full">
    <table className="min-w-175 w-full text-xs md:text-sm">
      <thead className="bg-gray-100 border border-gray-300 text-gray-600">
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr key={headerGroup.id}>
            <th className="w-8 p-0 border-b"></th>
            {headerGroup.headers.map((header: any) => (
              <th key={header.id} className="text-left font-medium px-2 py-2 border-b">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
            {extraHeader}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row: any) => (
          <React.Fragment key={row.id}>
            <tr
              className="hover:bg-gray-50 border-b cursor-pointer border-gray-300 transition"
              onClick={() =>
                setSelectedId(selectedId === row.original.id ? null : row.original.id)
              }
            >
              <td className="px-2 py-2">
                <ChevronRight
                  size={14}
                  className={`transition ${selectedId === row.original.id ? "rotate-90" : ""}`}
                />
              </td>
              {row.getVisibleCells().map((cell: any) => (
                <td key={cell.id} className="px-2 text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {renderExtraColumns && renderExtraColumns(row)}
            </tr>
            <tr>
              <td colSpan={columns.length + 2} className="p-0 border-0">
                {selectedId === row.original.id && <ExpandComponent row={row} />}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExpandableTable;
