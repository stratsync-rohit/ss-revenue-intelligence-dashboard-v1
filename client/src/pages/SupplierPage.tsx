import SupplierTable from "../components/supplier/SupplierTable"

const SupplierReport = () => {

  return (
    <div className="w-full space-y-4">

        <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Supplier Report</h1>

        <button className="border px-4 py-1 rounded-lg">
          Export
        </button>
      </div>


      <SupplierTable/>

    </div>
  )
}

export default SupplierReport