const SupplierExpand = () => {

  return (

    <div className="p-6 bg-gray-50 space-y-6">

      {/* Pending PO */}
      <div>

        <h3 className="font-semibold mb-2">
          Pending Purchase Orders
        </h3>

        <div className="flex gap-4">

          <div className="border rounded-lg p-3">
            Total Value: $385,000
          </div>

          <div className="border rounded-lg p-3">
            Volume: 28,000 units
          </div>

        </div>

      </div>

      {/* Quarterly buying history */}
      <div>

        <h3 className="font-semibold mb-2">
          Quarterly Buying History
        </h3>

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th>Brand</th>
              <th>Quarter</th>
              <th>Volume</th>
              <th>Value</th>
              <th>Avg Cost</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Christian Dior</td>
              <td>Q1 2025</td>
              <td>5,200</td>
              <td>$624,000</td>
              <td>$120</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>

  )
}

export default SupplierExpand