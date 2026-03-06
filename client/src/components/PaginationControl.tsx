import React from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface InventoryPaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const InventoryPagination: React.FC<InventoryPaginationProps> = ({ page, totalPages, setPage }) => (
  <div className="flex justify-center items-center p-2 gap-2 sm:gap-4 w-full text-xs sm:text-sm">
    <button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page === 1}
      className="disabled:opacity-50 px-2 py-1 sm:px-3 sm:py-2 rounded focus:outline-none focus:ring"
      aria-label="Previous page"
    >
      <ArrowLeft size={18} />
    </button>
    <span className="mx-2">
      Page {page} of {totalPages}
    </span>
    <button
      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      disabled={page === totalPages}
      className="disabled:opacity-50 px-2 py-1 sm:px-3 sm:py-2 rounded focus:outline-none focus:ring"
      aria-label="Next page"
    >
      <ArrowRight size={18} />
    </button>
  </div>
);

export default InventoryPagination;
