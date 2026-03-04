import { useState } from "react"
import CustomerRow from "./CustomerRow"

const data = [
  {
    id: "1",
    customer: "Paris Gallery LLC",
    qty3m: 3200,
    qty6m: 7400,
    ytd: "$798,000",
    pending: "$124,500",
    blockers: "-"
  },
  {
    id: "2",
    customer: "Faces Beauty Stores",
    qty3m: 1800,
    qty6m: 4200,
    ytd: "$390,000",
    pending: "$48,200",
    blockers: "-"
  }
]

const CustomerTable = () => {

  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  return (

    <div className="border rounded-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Customer</th>
            <th>3M Qty</th>
            <th>6M Qty</th>
            <th>YTD Business Value</th>
            <th>Pending Orders</th>
            <th>Blockers</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item) => (
            <CustomerRow
              key={item.id}
              item={item}
              expandedRow={expandedRow}
              setExpandedRow={setExpandedRow}
            />
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default CustomerTable