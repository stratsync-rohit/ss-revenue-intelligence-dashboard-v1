
import React from "react";
import ExpandableTable from "../ExpandableTable";
import InventoryExpand from "./InventoryExpand";
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
}) => {
  // Adapter for ExpandableTable: pass row.original to InventoryExpand as 'item'
  const ExpandComponent = ({ row }: { row: any }) => (
    <InventoryExpand item={row.original} />
  );
  // Render Action column
  const renderExtraColumns = () => (
    <td className="px-2 py-2 text-right">
      <ActionDropdown />
    </td>
  );
  // Add Action header
  const extraHeader = <th className="px-4 py-3 border-b text-right">Action</th>;
  return (
    <ExpandableTable
      table={table}
      columns={columns}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      ExpandComponent={ExpandComponent}
      renderExtraColumns={renderExtraColumns}
      extraHeader={extraHeader}
    />
  );
};

export default InventoryTable;