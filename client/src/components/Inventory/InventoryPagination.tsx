import React from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface InventoryPaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const InventoryPagination: React.FC<InventoryPaginationProps> = ({ page, totalPages, setPage }) => (
  <div className="flex justify-center items-center p-4 gap-4">
    <button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page === 1}
      className="disabled:opacity-50"
    >
      <ArrowLeft />
    </button>
    <span>
      Page {page} of {totalPages}
    </span>
    <button
      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      disabled={page === totalPages}
      className="disabled:opacity-50"
    >
      <ArrowRight />
    </button>
  </div>
);

export default InventoryPagination;
