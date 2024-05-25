import RightArrow from "assets/icons/rightarrow.svg?react"
import LeftArrow from "assets/icons/leftarrow.svg?react"
import { useState } from "react"

interface Props<T> {
  /**
   * List of objects that have the same type. Optional props are ok
   */
  data: T[]
  /**
   * Max items to display on a page. Defaults to 15
   */
  showPerPage?: number
  /**
   * Pass in a callback for when the last page of the table is reached (i.e go to the next offset if paginating)
   */
  onLastPageCallback?: () => void
}

interface ITableFooterPaginator {
  maxPages: number
  currentPage: number
  onNext?: () => void
  onBack?: () => void
}

const TableFooterPaginator = ({
  maxPages,
  currentPage,
  onNext,
  onBack
}: ITableFooterPaginator) => (
  <>
    <span className="flex items-center gap-2">
      <span
        className="fill-gray-4 flex h-[10px] w-[10px] cursor-pointer"
        onClick={onBack}
      >
        <LeftArrow />
      </span>
      <h5 className="select-none font-bold text-black">PAGE</h5>
      <input
        value={currentPage}
        className="border-gray-3 text-h5 h-5 w-6 rounded-md px-0 pl-[4px] text-black"
      />
      <h5 className="text-h5 select-none font-bold text-black">
        OF {maxPages}
      </h5>
      <span
        className="fill-gray-4 flex h-[10px] w-[10px] cursor-pointer"
        onClick={onNext}
      >
        <RightArrow />
      </span>
    </span>
  </>
)

const Table = <T extends Record<string, any>>({
  data,
  showPerPage = 15
}: Props<T>) => {
  // Needs to be zero-indexed
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)

  // Integer division w/o remainder
  const totalPages = Math.floor(data.length / showPerPage)

  const onNext = () => {
    if (currentPageIndex === totalPages - 1) return
    setCurrentPageIndex((currentPage) => currentPage + 1)
  }

  const onBack = () => {
    if (currentPageIndex === 0) return
    setCurrentPageIndex((currentPage) => currentPage - 1)
  }

  // calculating offset
  const currentFirstElement = currentPageIndex * showPerPage

  const dataKeys: string[] = []

  // ensures all data keys (columns) are used, regardless of whether some objects are missing keys
  const currentDataSlice = data.slice(
    currentFirstElement,
    currentFirstElement + showPerPage - 1
  )

  currentDataSlice.forEach((obj) => {
    Object.keys(obj).forEach(
      (key) => !dataKeys.includes(key) && dataKeys.push(key)
    )
  })

  return (
    <div className="border-gray-3 h-full w-full overflow-hidden rounded-t-sm border bg-white">
      <table className="h-full w-full">
        <thead className="border-b-gray-3 border-b">
          <tr>
            {dataKeys.map((key) => (
              <th
                key={key}
                className="text-gray-3 text-h5 py-2 pl-4 text-left uppercase"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {currentDataSlice.map((obj, index) => (
            <tr key={index} className="">
              {dataKeys.map((key) => (
                <td className="pb-2 pl-4 pt-2" key={key}>
                  {obj[key] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="border-b-gray-3 text-gray-3 flex h-11 items-center 
      justify-between border-t pl-2"
      >
        <h5>Total: {data.length}</h5>
        <TableFooterPaginator
          maxPages={totalPages}
          currentPage={currentPageIndex + 1}
          onNext={onNext}
          onBack={onBack}
        />
      </div>
    </div>
  )
}

export default Table
