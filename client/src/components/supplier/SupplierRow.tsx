import SupplierExpand from "./SupplierExpand"

const SupplierRow = ({item,expanded,setExpanded}) => {

 const handleClick = () => {
   setExpanded(expanded === item.id ? null : item.id)
 }

 return (
   <>
    <tr
     onClick={handleClick}
     className="border-t cursor-pointer hover:bg-gray-50"
    >

      <td className="p-3 flex items-center gap-3">

        {item.supplier}

        {item.expired && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
            {item.expired} expired
          </span>
        )}

        {item.expiring && (
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
            {item.expiring} expiring
          </span>
        )}

        {item.cover && (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
            {item.cover} to cover
          </span>
        )}

      </td>

      <td>{item.value}</td>

      <td>{item.pending}</td>

    </tr>

    {expanded === item.id && (
      <tr>
        <td colSpan={3}>
          <SupplierExpand/>
        </td>
      </tr>
    )}

   </>
 )
}

export default SupplierRow