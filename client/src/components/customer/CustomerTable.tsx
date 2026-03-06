
import React from "react";
import ExpandableTable from "../ExpandableTable";
import CustomerExpand from "./CustomerExpand";

interface CustomerTableProps {
  table: any;
  columns: any;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  table,
  columns,
  selectedId,
  setSelectedId,
}) => {
  // Adapter for ExpandableTable: pass row.original to CustomerExpand as 'item'
  const ExpandComponent = ({ row }: { row: any }) => (
    <CustomerExpand item={row.original} />
  );
  return (
    <ExpandableTable
      table={table}
      columns={columns}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      ExpandComponent={ExpandComponent}
    />
  );
};

export default CustomerTable;