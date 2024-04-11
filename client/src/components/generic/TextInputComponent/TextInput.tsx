import React from "react"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  success?: boolean
}

const TextInput = ({ success, ...props }: TextInputProps) => {
  const borderColor = success ? "green" : "var(--Greys-100, #242424)"
  const paddingLeft = "20px"
  const borderWidth = "2px"

  return (
    <input
      className="invalid:border-red flex-shrink:0 border-radius: 0.25rem h-9 w-full rounded border border"
      style={{ borderColor, borderWidth, paddingLeft }}
      {...props}
    />
  )
}

export default TextInput
