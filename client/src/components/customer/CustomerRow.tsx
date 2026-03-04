import CustomerExpand from "./CustomerExpand"

const CustomerRow = ({ item, expandedRow, setExpandedRow }) => {

  const handleClick = () => {
    setExpandedRow(expandedRow === item.id ? null : item.id)
  }

  return (
    <>
      <tr
        onClick={handleClick}
        className="border-t cursor-pointer hover:bg-gray-50"
      >
        <td className="p-3">{item.customer}</td>
        <td>{item.qty3m}</td>
        <td>{item.qty6m}</td>
        <td>{item.ytd}</td>
        <td>{item.pending}</td>
        <td>{item.blockers}</td>
      </tr>

      {expandedRow === item.id && (
        <tr>
          <td colSpan={6}>
            <CustomerExpand item={item} />
          </td>
        </tr>
      )}
    </>
  )
}

export default CustomerRow