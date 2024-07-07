interface IRadioProps {
  children: string
  disabled?: boolean
}

type props = IRadioProps & React.InputHTMLAttributes<HTMLInputElement>

const Radio = ({ children, ...props }: props) => {
  return (
    <div>
      <label className="flex">
        <input
          type="radio"
          id="1"
          name="default-radio"
          {...props}
          disabled={props.disabled}
          className="disabled:bg-gray-2 border-light-blue-100  checked:bg-light-blue-100 h-[24px] w-[24px] checked:border-2 disabled:border-transparent"
        />
        <div className="text-p pl-[12px]">{children}</div>
      </label>
    </div>
  )
}

export default Radio
