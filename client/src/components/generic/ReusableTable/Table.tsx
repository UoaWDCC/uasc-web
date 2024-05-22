interface Props<T> {
  data: T[]
}

const Table = <T extends Record<string, any>>({ data }: Props<T>) => {
  // ensures all data keys (columns) are used, regardless of whether some objects are missing keys
  const dataKeys: string[] = []
  data.forEach((obj) => {
    Object.keys(obj).forEach(
      (key) => !dataKeys.includes(key) && dataKeys.push(key)
    )
  })

  return (
    <table className="h-full w-full border border-black">
      <thead className="">
        <tr>
          {dataKeys.map((key) => (
            <th key={key} className="text-gray-2 pl-4 text-left uppercase">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((obj, index) => (
          <tr key={index}>
            {dataKeys.map((key) => (
              <td className="pl-4" key={key}>
                {obj[key] || ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
