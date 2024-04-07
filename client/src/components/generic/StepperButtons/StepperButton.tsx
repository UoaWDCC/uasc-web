type buttonVariants = "normal" | "disabled"
interface props {
  children?: React.ReactNode
  variant?: buttonVariants
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

const Default = ({ children, props }: props) => {
  return (
    <button {...props} className="">
      <span className="relative z-10 hover:text-white">{children}</span>
    </button>
  )
}
const Disabled = ({ children, props }: props) => {
  return (
    <button {...props} className="w-164 h-40 font=sans">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="164"
        height="40"
        viewBox="0 0 164 40"
        fill="none"
      >
        <path d="M144 0H0L20 20L0 40H144L164 20L144 0Z" fill="#283D87" />
        <text x="30" y="25" fill="white">
          {children}
        </text>
      </svg>
    </button>
  )
}

const StepperButton = ({ children, variant, props }: props) => {
  switch (variant) {
    case "normal":
      return <Default props={props}>{children}</Default>
    case "disabled":
      return <Disabled props={props}>{children}</Disabled>
  }
  return <Default props={props}>{children}</Default>
}

export default StepperButton
