type buttonVariants = "normal" | "first"
interface IStepperButtonProps {
  children?: React.ReactNode
  variant?: buttonVariants
}

const Default = ({
  children,
  ...props
}: IStepperButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className=" text-p bg-dark-blue-100 disabled:bg-dark-blue-60  text-white stepper-shape h-9 w-full max-w-[153px] px-10"
    >
      {children}
    </button>
  )
}

const First = ({
  children,
  ...props
}: IStepperButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className=" text-p bg-dark-blue-100 disabled:bg-dark-blue-60  text-white first-stepper-shape h-9 w-full max-w-[153px] px-10"
    >
      {children}
    </button>
  )
}

const StepperButton = ({
  children,
  variant,
  ...props
}: IStepperButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  switch (variant) {
    case "normal":
      return <Default {...props}>{children}</Default>
    case "first":
      return <First {...props}>{children}</First>
  }
  return <Default {...props}>{children}</Default>
}

export default StepperButton
