/**
 * Tab component used for navigation. Treat as a button, so provide appropriate aria tags.
 */
const Tab = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="text-h5 font-bold disabled:text-light-blue-100 
      uppercase border-b-[3px] border-transparent disabled:border-light-blue-100
    hover:text-light-blue-100 pb-2"
    >
      {children}
    </button>
  )
}

export default Tab
