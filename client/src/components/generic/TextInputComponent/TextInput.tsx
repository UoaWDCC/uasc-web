import React from "react"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  success?: boolean
  error?: boolean
}

const TextInput = ({ success, error, ...props }: TextInputProps) => {
  const borderColor = success
    ? "var(--Other-Green, #109D27)"
    : error
      ? "var(--Other-Red, #9A141D)"
      : "var(--Greys-100, #242424)"
  const paddingLeft = "20px"
  const borderWidth = success || error ? "2px" : "1px"

  return (
    <input
      className="flex-shrink:0 border-radius: 0.25rem h-9 w-full rounded"
      style={{ borderColor, borderWidth, paddingLeft }}
      {...props}
    />
  )
}

export default TextInput
