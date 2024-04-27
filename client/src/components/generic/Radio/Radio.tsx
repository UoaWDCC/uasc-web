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
          className=""
        />
        <div className="">{children}</div>
      </label>
    </div>
  )
}

export default Radio
