import { ReactNode } from "react"

interface IMenuListProps {
  children?: ReactNode
}

const MenuList = ({ children }: IMenuListProps) => {
  return (
    <div className="border-light-blue-100 flex w-fit rounded-b-md border-2 py-4 pl-4 pr-20">
      <ul className="text-h5 col flex flex-col gap-3 font-bold uppercase">
        {children}
      </ul>
    </div>
  )
}

export default MenuList
