import { useState } from "react"
import DownArrow from "assets/icons/downarrow.svg?react"
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
      className=" hover:border-light-blue-100 hover:text-light-blue-100 
      flex w-fit items-start gap-[12px] border-b-[3px] border-transparent
      pb-2 hover:cursor-pointer "
    >
      <button {...props} className="text-h5 font-bold uppercase">
        {displayText}
      </button>
      <div className="mt-[5.5px] flex h-[12px] w-[12px] items-start">
        <DownArrow
          className={
            isOpened
              ? "text-light-blue-100 fill-current"
              : "fill-current text-black"
          }
        />
      </div>
    </div>
  )
}
export default MenuTab
