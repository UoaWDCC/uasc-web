import { useState } from "react"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowObjectWithIdentifier,
  TableRowOperation,
  TableRowOperationStyle
} from "./TableUtils"
import TableFooterPaginator from "./TableFooterPaginator"
import ThreeDotsVertical from "assets/icons/three-dots-vertical.svg?react"

interface ITable<T extends TableRowObjectWithIdentifier> {
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
  /**
   * decides if clicking on the row options will give multiple options or a single one
   */
  operationType: TableRowOperationStyle

  /**
   * @example {operationName: "Delete User", (identifier: string) => {deleteUserWithUid(identifier)}}
   */
  rowOperations?: TableRowOperation[]
}

const OperationButton = ({
  operationType,
  uid,
  rowOperations
}: Pick<
  ITable<TableRowObjectWithIdentifier>,
  "operationType" | "rowOperations"
> &
  TableRowObjectWithIdentifier) => {
  if (!rowOperations) return null

  switch (operationType) {
    case "multiple-operations":
      return (
        <div className="flex h-full items-center px-2">
          <div className="h-[15px] w-[15px] cursor-pointer">
            <ThreeDotsVertical className="fill-black" />
          </div>
        </div>
      )

    case "single-operation":
      return (
        <div className="flex h-full items-center px-2">
          <h5 onClick={() => rowOperations && rowOperations[0]?.handler(uid)}>
            X
          </h5>
        </div>
      )

    case "none":
      return null
  }
}

const Table = <T extends Record<string, any>>({
  data,
  showPerPage = 15,
  operationType = "none",
  rowOperations
}: ITable<T & TableRowObjectWithIdentifier>) => {
  // Needs to be zero-indexed
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0)

  // Integer division w/o remainder
  const totalPages = Math.ceil(data.length / showPerPage)

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
      (key) => !dataKeys.includes(key) && key !== "uid" && dataKeys.push(key)
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
              <OperationButton
                operationType={operationType}
                rowOperations={rowOperations}
                uid={obj[TABLE_ROW_IDENTIFIER_KEY]}
              />
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
