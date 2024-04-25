type checkboxVariants = "unclicked" | "clicked"

interface ICheckboxProps {
  children?: React.ReactNode
  variant?: checkboxVariants
}

type props = ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ children, ...props }: props) => {
  return <div {...props}> {children} </div>
}

export default Checkbox
