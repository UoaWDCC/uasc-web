import { ReactNode } from "react"

interface IMenuListProps {
  anchor?: "left" | "right"
  children?: ReactNode
}

const MenuList = ({ children, anchor = "left" }: IMenuListProps) => {
  return (
    <div className="border-light-blue-100 bg-gray-1 flex w-full rounded-b-md border-2 py-4 ">
      <div
        className={`text-h5 col flex w-full flex-col gap-3 font-bold uppercase
             ${anchor === "left" ? "mr-14 pl-4" : "ml-14 pr-4"}`}
      >
        {children}
      </div>
    </div>
  )
}

export default MenuList
