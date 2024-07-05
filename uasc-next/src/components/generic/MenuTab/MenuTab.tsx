import { useState } from "react"
import DownArrow from "@/assets/icons/downarrow.svg"
import MenuList from "../MenuList/MenuList"
import Image from "next/image"
interface IMenuTabProps {
  displayText: string
}
type props = IMenuTabProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const MenuTab = ({ displayText, children, ...props }: props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  return (
    <div
      onMouseEnter={() => setIsOpened(true)}
      onMouseLeave={() => setIsOpened(false)}
      className=" hover:border-b-light-blue-100  
      relative box-content flex w-fit items-start gap-[12px]
      border-b-[3px] border-b-transparent pb-3"
    >
      <button
        {...props}
        className={`${isOpened ? "text-light-blue-100" : ""} text-h5 font-bold uppercase hover:cursor-pointer`}
      >
        {displayText}
      </button>
      <div className="mt-[4px] flex h-[6px] w-[12px] items-start">
        <DownArrow
          className={
            isOpened
              ? "text-light-blue-100 fill-current"
              : "fill-current text-black"
          }
        />
      </div>
      {isOpened && (
        <span className="absolute top-[calc(100%+2px)] w-[150%]">
          <MenuList>{children}</MenuList>
        </span>
      )}
    </div>
  )
}
export default MenuTab
