import type React from "react"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "success" | "error"
  /**
   * The description of the text box
   *
   * @example "First Name"
   */
  label?: string
  description?: string
}

const TextInput = ({
  variant,
  label,
  description,
  ...props
}: TextInputProps) => {
  return (
    <div>
      {label && (
        <label className="text-black" htmlFor={{ ...props }.id}>
          {label}
        </label>
      )}
      {description && (
        <p className="text-dark-blue-60 mb-1 text-xs">{description}</p>
      )}
      <input
        className={`flex-shrink:0 border-radius: 0.25rem h-9 w-full rounded pl-5 ${variant} ${variant ? "border-2" : "border"} invalid:border-red focus:border-black ${variant === "success" ? "border-green" : "border-gray-3"}`}
        {...props}
      />
    </div>
  )
}

export default TextInput
