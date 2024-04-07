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
      className="text-h5 disabled:text-light-blue-100 disabled:border-light-blue-100 
      hover:text-light-blue-100 border-b-[3px] border-transparent pb-2
    font-bold uppercase"
    >
      {children}
    </button>
  )
}

export default Tab
