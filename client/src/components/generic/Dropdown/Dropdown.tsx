import React from "react"

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement>

const Dropdown = ({ ...props }: DropdownProps) => {
  return (
    <select
      className="flex-shrink:0 border-radius: 0.25rem h-9 w-full rounded"
      style={{
        borderColor: "var(--Greys-100, #242424)",
        borderWidth: "1px",
        borderStyle: "solid",
        paddingLeft: "18px"
      }}
      {...props}
    />
  )
}

export default Dropdown
