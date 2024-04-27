interface ICheckboxProps {
  children: string
  disabled: boolean
}

type props = ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ children, ...props }: props) => {
  return (
    <div>
      <label className="flex">
        <input
          type="checkbox"
          id="1"
          name="Checkbox"
          {...props}
          checked={props.checked}
          disabled={props.disabled}
          className="border-light-blue-100 disabled:bg-gray-3 checked:bg-light-blue-100 h-[24px] w-[24px] rounded border disabled:border-none"
        />
        <div className="font-size-16 text-p pl-[12px] pt-[2px]">{children}</div>
      </label>
    </div>
  )
}

export default Checkbox
