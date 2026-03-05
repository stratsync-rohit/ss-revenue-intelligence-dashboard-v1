import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Send, Tag, RefreshCw, Flag } from "lucide-react";

const ActionDropdown = () => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownHeight = 200; // px, adjust if dropdown height changes

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setDropUp(spaceBelow < dropdownHeight);
    }
  }, [open]);

  return (
    <div className="relative">
      {/* 3 DOT BUTTON */}
      <button
        ref={btnRef}
        onClick={e => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="p-1 rounded hover:bg-gray-100"
      >
        <MoreHorizontal size={16} />
      </button>
      {/* DROPDOWN */}
      {open && (
        <div
          className={`absolute right-0 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 ${dropUp ? 'bottom-full mb-2' : 'mt-2'}`}
          style={{
            ...(dropUp ? { bottom: '100%' } : {}),
            maxHeight: 208, // 4 items * 52px each (py-2 + gap)
            overflowY: 'auto',
            minHeight: 0
          }}
        >
          <DropdownItem icon={<Send size={16} />} text="Push to Customers" />
          <DropdownItem icon={<Tag size={16} />} text="Create Clearance Offer" />
          <DropdownItem icon={<RefreshCw size={16} />} text="Reorder from Supplier" />
          <DropdownItem icon={<Flag size={16} />} text="Flag for Review" />
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ icon, text }: any) => (
  <div className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
    {icon}
    <span className="text-xs font-medium">{text}</span>
  </div>
);

export default ActionDropdown;
