import React from "react"
import type { CustomerItem } from "../../types/customer"

interface Props {
  item: CustomerItem
}

const CustomerExpand: React.FC<Props> = ({ item }) => {

  return (
    <div className="bg-gray-50 p-6 space-y-6">

      {/* KEY BRANDS */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">
          KEY BRANDS PURCHASED
        </h3>

        <div className="grid grid-cols-3 gap-4">

          {item.keyBrands.map((b, i) => (
            <div key={i} className="bg-white border rounded-lg p-4">

              <p className="font-medium">{b.brand}</p>

              <div className="flex justify-between text-sm mt-2">
                <span>3M Qty</span>
                <span>{b.qty3m}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>6M Qty</span>
                <span>{b.qty6m}</span>
              </div>

              <div className="text-orange-500 text-sm mt-1">
                Pending SO {b.pendingSO}
              </div>

            </div>
          ))}

        </div>
      </div>


      {/* QUARTERLY SALES */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-3">
          QUARTERLY SALES HISTORY
        </h3>

        <table className="w-full text-sm border">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Brand</th>
              <th>Quarter</th>
              <th>Volume</th>
              <th>Value</th>
              <th>Avg Price</th>
            </tr>
          </thead>

          <tbody>
            {item.quarterlySales.map((q,i)=>(
              <tr key={i} className="border-t text-center">
                <td className="text-left p-2">{q.brand}</td>
                <td>{q.quarter}</td>
                <td>{q.volume}</td>
                <td>{q.value}</td>
                <td>{q.avgPrice}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>


      {/* SKU PRICE HISTORY */}

      <div>

        <h3 className="text-xs font-semibold text-gray-500 mb-3">
          SKU PRICE HISTORY
        </h3>

        <table className="w-full text-sm border">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">SKU</th>
              <th>Quarter</th>
              <th>Price</th>
              <th>Qty Sold</th>
            </tr>
          </thead>

          <tbody>
            {item.skuPriceHistory.map((s,i)=>(
              <tr key={i} className="border-t text-center">
                <td className="text-left p-2">{s.sku}</td>
                <td>{s.quarter}</td>
                <td>{s.price}</td>
                <td>{s.qtySold}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>


      {/* VELOCITY SUGGESTIONS */}

      <div>

        <h3 className="text-xs font-semibold text-gray-500 mb-3">
          VELOCITY-BASED SUGGESTIONS
        </h3>

        <table className="w-full text-sm border">

          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Brand</th>
              <th>Last Quarter</th>
              <th>Last Vol</th>
              <th>Growth</th>
              <th>Projected Vol</th>
              <th>Projected Value</th>
            </tr>
          </thead>

          <tbody>
            {item.suggestions.map((s,i)=>(
              <tr key={i} className="border-t text-center">
                <td className="text-left p-2">{s.brand}</td>
                <td>{s.lastQuarter}</td>
                <td>{s.lastVol}</td>
                <td className="text-green-600">{s.growth}</td>
                <td>{s.projectedVol}</td>
                <td>{s.projectedValue}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default CustomerExpand
