import React from "react"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "success" | "error"
}

const TextInput = ({ variant, ...props }: TextInputProps) => {
  const borderColor =
    variant === "success"
      ? "var(--Other-Green, #109D27)"
      : variant === "error"
        ? "var(--Other-Red, #9A141D)"
        : "var(--Greys-100, #242424)"
  const paddingLeft = "20px"
  const borderWidth = variant ? "2px" : "1px"

  return (
    <input
      className={`flex-shrink:0 border-radius: 0.25rem h-9 w-full rounded ${variant}`}
      style={{ borderColor, borderWidth, paddingLeft }}
      {...props}
    />
  )
}

export default TextInput
