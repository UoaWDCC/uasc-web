import React from "react"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>

const TextInput = ({ ...props }: TextInputProps) => {
  return (
    <input
      className="invalid:border-red h-9 w-full rounded border"
      {...props}
    />
  )
}

export default TextInput
