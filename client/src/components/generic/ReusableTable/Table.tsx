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
    <div>
      <div className="border-dark-blue-100 grid h-[32px] w-full grid-cols-8 border uppercase">
        <p>name</p>
        <p>email</p> <p>status</p> <p>membership</p>
        <p>type</p>
        <p>date joined</p>
      </div>
      <div className="grid h-[500px] w-full grid-cols-3 border border-black">
        <div className="flex pl-4 pr-4">
          <table className="">
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
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
