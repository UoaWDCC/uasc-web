import React from "react"

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  description?: string
}

const Dropdown = ({ label, description, ...props }: DropdownProps) => {
  return (
    <div
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      {label && <label className="text-black">{label}</label>}
      {description && (
        <p className="text-dark-blue-60 mb-1 text-xs">{description}</p>
      )}
      <select
        className="border-gray-3 rounded border bg-transparent bg-white bg-contain bg-right bg-no-repeat px-4 py-2"
        style={{
          marginRight: "2rem",
          flexShrink: 0,
          width: "100%",
          paddingLeft: "18px"
        }}
        {...props}
        // explicitly declaring value attribute allows dropdown to show placeholder value by default
        value={{ ...props }.value || ""}
      />
    </div>
  )
}

export default Dropdown
