import React from "react"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "success" | "error"
  label?: string
  description?: string
  id?: string
}

const TextInput = ({
  variant,
  label,
  description,
  id,
  ...props
}: TextInputProps) => {
  const borderColor =
    variant === "success"
      ? "var(--Other-Green, #109D27)"
      : variant === "error"
        ? "var(--Other-Red, #9A141D)"
        : "var(--Greys-100, #242424)"
  const paddingLeft = "20px"
  const borderWidth = variant ? "2px" : "1px"

  return (
    <div>
      {label && (
        <label className="text-black" htmlFor={id}>
          {label}
        </label>
      )}
      {description && (
        <p className="text-dark-blue-60 mb-1 text-xs">{description}</p>
      )}
      <input
        className={`flex-shrink:0 border-radius: 0.25rem h-9 w-full rounded ${variant}`}
        style={{ borderColor, borderWidth, paddingLeft }}
        id={id}
        {...props}
      />
    </div>
  )
}

export default TextInput
