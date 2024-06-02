import { useRef, useState } from "react"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowObjectWithIdentifier,
  TableRowOperation,
  TableRowOperationStyle
} from "./TableUtils"
import TableFooterPaginator from "./TableFooterPaginator"
import ThreeDotsVertical from "assets/icons/three-dots-vertical.svg?react"
import { useClickOutside } from "components/utils/Utils"

type TableRowOperations<T extends TableRowOperationStyle> =
  T extends "multiple-operations"
    ? TableRowOperation[]
    : T extends "single-operation"
      ? [TableRowOperation]
      : undefined

interface ITable<
  T extends TableRowObjectWithIdentifier,
  S extends TableRowOperationStyle
> {
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
  operationType?: TableRowOperationStyle

  /**
   * @example // {operationName: "Delete User", (identifier: string) => {deleteUserWithUid(identifier)}}
   */
  rowOperations?: TableRowOperations<S>
}

const OperationButton = <
  T extends TableRowObjectWithIdentifier,
  S extends TableRowOperationStyle
>({
  operationType,
  uid,
  rowOperations
}: Pick<ITable<T, S>, "operationType" | "rowOperations"> & T) => {
  if (!rowOperations || !operationType) return null

  switch (operationType) {
    case "multiple-operations": {
      const menuRef = useRef<HTMLDivElement>(null)
      useClickOutside(menuRef, () => setIsOpen(false))
      const [isOpen, setIsOpen] = useState<boolean>(false)
      return (
        <div
          ref={menuRef}
          className="relative flex h-full items-center overflow-visible px-2"
        >
          <div className="h-[15px] w-[15px] cursor-pointer">
            <ThreeDotsVertical
              className="fill-black"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          {isOpen && (
            <div
              className="navbar-shadow border-1 gray-4 absolute bottom-4 right-full
               flex w-52 flex-col items-start gap-2 border bg-white px-3 py-2"
            >
              {rowOperations.map((operation) => (
                <p
                  className="hover:text-light-blue-100 cursor-pointer select-none"
                  key={operation.name}
                  onClick={() => operation.handler(uid)}
                >
                  {operation.name}
                </p>
              ))}
            </div>
          )}
        </div>
      )
    }

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

/**
 *
 * To use multiple operations (will display a meny with the options provided)
 * @example  ```tsx
 *          <Table<UserTypeWithUid, "multiple-operations">
 *              data={data}
 *              operationType="multiple-operations"
 *              rowOperations={[{handler: (id) => {console.log(id)}}, {handler: (id) => {console.(id)}}]} />
 *           ```
 *
 *
 * To use one operation (will display a single button)
 * @example  ```tsx
 *          <Table<UserTypeWithUid, "single-operation">
 *              data={data}
 *              operationType="single-operation"
 *              rowOperations={[{handler: (id) => {console.(id)}}]} />
 *           ```
 */
const Table = <
  T extends Record<string, any>,
  S extends TableRowOperationStyle
>({
  data,
  showPerPage = 15,
  operationType = "none",
  rowOperations
}: ITable<T & TableRowObjectWithIdentifier, S>) => {
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
    <div className="border-gray-3 h-full w-full  overflow-y-visible rounded-t-sm border bg-white">
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
