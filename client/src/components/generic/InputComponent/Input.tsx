import React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className="invalid:border-red h-9 w-full rounded border"
      {...props}
    />
  )
}

export default Input
