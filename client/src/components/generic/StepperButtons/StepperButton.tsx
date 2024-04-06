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

const StepperButton = ({ children, variant, props }: props) => {
  switch (variant) {
    case "normal":
      return <Default props={props}>{children}</Default>
  }
  return <Default props={props}>{children}</Default>
}

export default StepperButton
