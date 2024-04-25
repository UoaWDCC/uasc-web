type checkboxVariants = "default" | "checked" | "disabled"

interface ICheckboxProps {
  children: string
  variant?: checkboxVariants
}

type props = ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ children, ...props }: props) => {
  return (
    <div {...props}>
      <label htmlFor="vehicle1" className="flex">
        <input type="checkbox" id="1" name="Checkbox" disabled={false} />
        <div className="font-size-16 text-p pl-[12px]">{children}</div>
      </label>
    </div>
  )
}

// waiting on implementing disabling function

export default Checkbox
