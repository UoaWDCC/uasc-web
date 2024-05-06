import RightArrowIcon from 'assets/icons/rightarrow.svg?react'

interface ITab {
  stretchesOnSmallScreen?: boolean
}
/**
 * Tab component used for navigation. Treat as a button, so provide appropriate aria tags.
 */
const Tab = ({
  stretchesOnSmallScreen = false,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ITab) => {
  if (stretchesOnSmallScreen) {
    return <button
      {...props}
      className="text-h3 md:text-h5 disabled:text-light-blue-100 disabled:border-light-blue-100 
      md:hover:text-light-blue-100 md:border-b-[3px] border-transparent pb-3
    md:font-bold md:uppercase flex items-center justify-between w-full"
    >
      {children}

      <div className="mt-[2px] flex h-8 w-5 md:hidden">
        <RightArrowIcon className="fill-black" />
      </div>

    </button>
  }
  return <button
    {...props}
    className="text-h5 disabled:text-light-blue-100 disabled:border-light-blue-100 
      hover:text-light-blue-100 border-b-[3px] border-transparent pb-3
    font-bold uppercase"
  >
    {children}
  </button>
}

export default Tab
