interface IRadioProps {
  children: string
  disabled: boolean
}

type props = IRadioProps & React.InputHTMLAttributes<HTMLInputElement>

const Radio = ({ children, ...props }: props) => {
  return (
    <div>
      <label className="flex">
        <input
          type="radio"
          id="1"
          name="Radio"
          {...props}
          disabled={props.disabled}
          className="disabled:bg-gray-2 disabled:border-transparent border border-light-blue-100 checked:bg-light-blue-100 w-[24px] h-[24px]"
        />
        <div className="pl-[12px] text-p">{children}</div>
      </label>
    </div>
  )
}

export default Radio
