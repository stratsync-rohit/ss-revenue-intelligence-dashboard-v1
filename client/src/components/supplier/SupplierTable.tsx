import { useState } from "react"
import SupplierRow from "./SupplierRow"

const data = [
  {
    id:"1",
    supplier:"LVMH Distribution",
    value:"$596,400",
    pending:"$385,000",
    expired:1,
    expiring:1,
    cover:1
  },
  {
    id:"2",
    supplier:"Bulgari MEA",
    value:"$274,400",
    pending:"$142,000",
    expiring:1
  },
  {
    id:"3",
    supplier:"Coty Prestige",
    value:"$261,000",
    pending:"$218,500",
    expired:1,
    cover:1
  }
]

const SupplierTable = () => {

  const [expanded,setExpanded] = useState<string | null>(null)

  return (

    <div className="border rounded-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Supplier</th>
            <th>Business Value</th>
            <th>Pending POs</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item)=>(
            <SupplierRow
              key={item.id}
              item={item}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default SupplierTable