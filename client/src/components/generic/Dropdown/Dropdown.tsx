import React from "react"
import DownArrow from "assets/icons/downarrow.svg"

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
}

const Dropdown = ({ label, ...props }: DropdownProps) => {
  return (
    <div
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      {label && <label>{label}</label>}
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
