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
    <div className="h-[500px] w-full border border-black">
      <table className="">
        <div className="pl-4 pr-4">
          <tbody>
            {data.map((obj, index) => (
              <tr key={index}>
                {dataKeys.map((key) => (
                  <td className="pr-3" key={key}>
                    {obj[key] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  )
}

export default Table
