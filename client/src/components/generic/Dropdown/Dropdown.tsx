import React from "react"

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement>

const Dropdown = ({ ...props }: DropdownProps) => {
  return (
    <select
      className="appearance-none rounded border border-gray-300 bg-transparent bg-contain bg-right bg-no-repeat px-4 py-2"
      style={{
        marginRight: "2rem",
        flexShrink: 0,
        width: "100%",
        paddingLeft: "18px",
        backgroundImage:
          "url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+)",
        backgroundPosition: "right 12px center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "24px 24px"
      }}
      {...props}
    />
  )
}

export default Dropdown
