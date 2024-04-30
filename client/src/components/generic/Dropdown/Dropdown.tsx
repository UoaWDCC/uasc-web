import React from "react"
import DownArrow from "assets/icons/downarrow.svg"

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
        className="appearance-none rounded border border-gray-300 bg-transparent bg-contain bg-right bg-no-repeat px-4 py-2"
        style={{
          marginRight: "2rem",
          flexShrink: 0,
          width: "100%",
          paddingLeft: "18px"
        }}
        {...props}
      />
      <img
        src={DownArrow}
        alt="Dropdown Arrow"
        style={{
          position: "absolute",
          top: "50%",
          right: "8px",
          transform: "translateY(-50%)",
          width: "18px",
          height: "auto"
        }}
      />
    </div>
  )
}

export default Dropdown
