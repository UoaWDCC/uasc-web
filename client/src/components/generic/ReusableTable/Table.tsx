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
    <div className="border-gray-3 h-screen w-full rounded-md border">
      <div>
        <div className="border-dark-blue-100 text-gray-3 grid h-[32px] w-full grid-cols-5 border pl-4 uppercase">
          <p className="font-bold">name</p>
          <p className="font-bold">email</p> <p className="font-bold">status</p>{" "}
          <p className="font-bold">membership type</p>
          <p className="font-bold">date joined</p>
        </div>

        <table className="grid w-full grid-cols-5 border border-black pl-4">
          <tbody className="grid gap-5">
            {data.map((obj, index) => (
              <tr key={index} className="border-red border">
                {dataKeys.map((key) => (
                  <td className="" key={key}>
                    {obj[key] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
