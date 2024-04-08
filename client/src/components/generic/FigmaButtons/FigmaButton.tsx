type buttonVariants =
  | "default"
  | "alternative"
  | "secondary"
  | "inverted-default"
  | "unalternative"
  | "unsecondary"

interface IButtonProps {
  children?: React.ReactNode
  variant?: buttonVariants
}

type props = IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const DefaultButton = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className="bg-dark-blue-100 enabled:hover:text-dark-blue-100 border-dark-blue-100
        space-x-4; disabled:bg-dark-blue-60 flex flex-col items-center rounded-md px-8 py-2 font-sans font-bold uppercase
        text-white hover:bg-white enabled:border"
    >
      {children}
    </button>
  )
}

const DefaultButtonInverted = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className={
        "border-dark-blue-100 text-h5 text-dark-blue-100 rounded-md border px-8 py-1 uppercase " +
        props.className
      }
    >
      {children}
    </button>
  )
}

const AlternativeButton = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className=" bg-light-blue-100 enabled:hover:text-light-blue-100 border-light-blue-100
      space-x-4; disabled:bg-light-blue-60 flex flex-col items-center rounded-md px-8 py-2 font-bold uppercase
      text-white enabled:border enabled:hover:bg-white"
    >
      {children}
    </button>
  )
}

const SecondaryButton = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className="bg-orange enabled:hover:text-orange 
       border-orange font-p
      space-x-4; disabled:bg-orange-60 flex flex-col items-center justify-center rounded-md px-8 py-2 font-bold uppercase
      text-white hover:bg-white enabled:border
    "
    >
      {children}
    </button>
  )
}

const Button = ({ children, variant, ...props }: props) => {
  switch (variant) {
    case "default":
      return <DefaultButton {...props}>{children}</DefaultButton>
    case "alternative":
      return <AlternativeButton {...props}>{children}</AlternativeButton>
    case "secondary":
      return <SecondaryButton {...props}>{children}</SecondaryButton>
    case "inverted-default":
      return (
        <DefaultButtonInverted {...props}>{children}</DefaultButtonInverted>
      )
  }
  return <DefaultButton {...props}>{children}</DefaultButton>
}

export default Button
