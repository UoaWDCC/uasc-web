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
        paddingLeft: "18px",
        WebkitAppearance: "none",
        MozAppearance: "none",
        background: "transparant",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "100%",
        backgroundPositionY: "5px",
        border: "1px solid #dfdfdf",
        borderRadius: "2px",
        marginRight: "2rem",
        padding: "1rem",
        paddingRight: "2rem"
      }}
      {...props}
    />
  )
}

export default Dropdown
