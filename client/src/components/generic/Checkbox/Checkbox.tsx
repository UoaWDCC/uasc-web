type checkboxVariants = "default" | "checked" | "disabled"

interface ICheckboxProps {
  children: string
  variant?: checkboxVariants
}

type props = ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ children, ...props }: props) => {
  return (
    <div {...props}>
      <label htmlFor="vehicle1">
        <input type="checkbox" id="1" name="Checkbox" />
        {children}
      </label>
    </div>
  )
}

export default Checkbox
