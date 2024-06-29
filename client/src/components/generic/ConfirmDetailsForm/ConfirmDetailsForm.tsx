import { ReactNode, CSSProperties } from "react"

interface IFormContainerProps {
  children: ReactNode
}

const ConfirmDetailsForm = ({ children }: IFormContainerProps) => {
  const formStyles: CSSProperties = {
    flexShrink: 0,
    borderRadius: "6px",
    border: "1px solid var(--Greys-60, #BDBDBD)",
    background: "#FFF",
    paddingLeft: "25px",
    overflowY: "auto",
    width: "100%",
    height: "100%"
  }

  // put all the css in classname instead of formStyles
  // (search up the tailwindcss equivalent of the css properties)

  return (
    <div className="w-[530px]" style={formStyles}>
      {children}
    </div>
  )
}

export default ConfirmDetailsForm
