interface ICheckboxProps {
  label: string
}

type props = ICheckboxProps & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ label, ...props }: props) => {
  return (
    <div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          id="1"
          name="Checkbox"
          {...props}
          className="border-light-blue-100 disabled:bg-gray-3 checked:bg-light-blue-100 h-[24px] w-[24px] rounded border disabled:border-none"
        />
        <p>{label}</p>
      </label>
    </div>
  )
}

export default Checkbox
