type checkboxVariants = "default" | "checked" | "disabled"

interface ICheckboxProps {
  children: string
  variant?: checkboxVariants
  checked: boolean
  disabled: boolean
}

type props = ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ children, ...props }: props) => {
  return (
    <div {...props}>
      <label className="flex">
        <input
          type="checkbox"
          id="1"
          name="Checkbox"
          checked = {props.checked}
          disabled={props.disabled}
        />
        <div className="font-size-16 text-p pl-[12px]">{children}</div>
      </label>
    </div>
  )
}

export default Checkbox
