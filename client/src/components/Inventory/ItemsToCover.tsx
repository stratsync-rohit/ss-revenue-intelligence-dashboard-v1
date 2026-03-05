import React, { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

// Sample data for development/demo
const SAMPLE_DATA = {
  labels: {
    header: "ITEMS TO COVER / BUY",
    table: ["SKU", "Description", "Net Position", "To Buy", "SO Expiry Alert"],
    subtitle: "COVERED BUT WITH EXPIRING SOS — VALIDATE WITH CUSTOMER",
  },
  itemsToCover: [
    {
      sku: "CD-SAU-50",
      description: "Sauvage EDT 50ml",
      netPosition: -270,
      toBuy: 270,
      alert: "ORD-5501 · 400u · EXPIRED",
    },
    {
      sku: "HB-BTL-50",
      description: "Boss Bottled EDT 50ml",
      netPosition: -320,
      toBuy: 320,
    },
  ],
  coveredButExpiring: [
    {
      sku: "CD-SAU-30",
      description: "Sauvage EDT 30ml",
      net: 775,
      alert: "ORD-5510 · Rivoli Group · 250u · EXPIRING",
      alertType: "expiring",
    },
    {
      sku: "BV-AQA-30",
      description: "Aqva Pour Homme 30ml",
      net: 460,
      alert: "ORD-5515 · Faces Beauty Stores · 180u · EXPIRING",
      alertType: "expiring",
    },
    {
      sku: "HB-BTL-100",
      description: "Boss Bottled EDT 100ml",
      net: 350,
      alert: "ORD-5502 · Paris Gallery LLC · 120u · EXPIRED",
      alertType: "expired",
    },
  ],
};


async function fetchItemsToCoverData() {
  try {
    const res = await fetch("/api/inventory/items-to-cover");
    if (!res.ok) throw new Error("API not available");
    return await res.json();
  } catch {
    return SAMPLE_DATA;
  }
}

const ItemsToCover = () => {
  const [labels, setLabels] = useState({
    header: "ITEMS TO COVER / BUY",
    table: ["SKU", "Description", "Net Position", "To Buy", "SO Expiry Alert"],
    subtitle: "COVERED BUT WITH EXPIRING SOS — VALIDATE WITH CUSTOMER",
  });
  const [itemsToCover, setItemsToCover] = useState([]);
  const [coveredButExpiring, setCoveredButExpiring] = useState([]);

  useEffect(() => {
    fetchItemsToCoverData().then((data) => {
      setLabels(data.labels);
      setItemsToCover(data.itemsToCover);
      setCoveredButExpiring(data.coveredButExpiring);
    });
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg bg-orange-50 p-3">

      {/* HEADER */}
      <div className="flex items-center gap-1 mb-2 text-orange-600 font-semibold tracking-wide text-xs">
        <ShieldAlert className="w-3 h-3" />
        <span>{labels.header}</span>
      </div>

      {/* TABLE */}
      <div className="border border-gray-300 rounded-[3px] bg-white">

        {/* table header */}
        <div className="grid grid-cols-5 px-3 py-2 bg-gray-100 text-gray-600 text-xs font-semibold">
          {labels.table.map((label, idx) => (
            <div key={idx} className={idx > 1 && idx < 4 ? "text-center" : undefined}>{label}</div>
          ))}
        </div>

        {/* table rows */}
        {itemsToCover.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 px-3 py-2 border-t border-gray-300 text-xs items-center"
          >
            <div className="font-semibold text-gray-800">{item.sku}</div>
            <div className="text-gray-600">{item.description}</div>
            <div className="text-center text-red-500 font-semibold">{item.netPosition}</div>
            <div className="text-center text-red-500 font-semibold">{item.toBuy}</div>
            <div>
              {item.alert ? (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-100 text-red-600">
                  {item.alert}
                </span>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SUBTITLE */}
      <div className="mt-3 mb-2 text-xs font-semibold text-gray-500 tracking-wide">
        {labels.subtitle}
      </div>

      {/* LIST */}
      <div className="space-y-2">

        {coveredButExpiring.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white border border-gray-300 rounded px-3 py-2"
          >
            <div className="flex gap-2 items-center text-xs">
              <span className="font-semibold text-gray-800">{item.sku}</span>
              <span className="text-gray-600">{item.description}</span>
              <span className="text-green-600 font-semibold">
                Net: +{item.net}
              </span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                ${
                  item.alertType === "expired"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                }`}
            >
              {item.alert}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsToCover;