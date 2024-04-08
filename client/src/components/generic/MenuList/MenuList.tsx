import { ReactNode } from "react"

interface IMenuListProps {
  children?: ReactNode
}

const MenuList = ({ children }: IMenuListProps) => {
  return (
    <div className="border-light-blue-100 bg-gray-1 flex w-full rounded-b-md border-2 py-4 ">
      <ul className="text-h5 col mr-20 flex w-full flex-col gap-3 pl-4 font-bold uppercase">
        {children}
      </ul>
    </div>
  )
}

export default MenuList
