import CustomerTable from "../components/customer/CustomerTable"

const CustomerReport = () => {
  return (
    <div className="w-full space-y-4">

      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Customer Report</h1>

        <button className="border px-4 py-1 rounded-lg">
          Export
        </button>
      </div>

      {/* Table */}
      <CustomerTable />

    </div>
  )
}

export default CustomerReport