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
      className="text-h5 bg-dark-blue-100 disabled:bg-dark-blue-60 text-white stepper-shape h-9 w-full max-w-[153px] pl-2 font-bold uppercase"
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
      className="text-h5 bg-dark-blue-100 disabled:bg-dark-blue-60 text-white first-stepper-shape h-9 w-full max-w-[153px] pr-3 font-bold uppercase"
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
