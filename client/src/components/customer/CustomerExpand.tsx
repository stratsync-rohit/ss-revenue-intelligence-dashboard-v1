const CustomerExpand = ({ item }) => {

  return (
    <div className="p-6 bg-gray-50 border-t">

      <h2 className="font-semibold mb-4">
        {item.customer} Details
      </h2>

      <div className="grid grid-cols-3 gap-4">

        <div className="border p-4 rounded-lg">
          Key Brands
        </div>

        <div className="border p-4 rounded-lg">
          Quarterly Sales
        </div>

        <div className="border p-4 rounded-lg">
          SKU History
        </div>

      </div>

    </div>
  )
}

export default CustomerExpand