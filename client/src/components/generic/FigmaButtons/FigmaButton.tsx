type buttonVariants =
  | "default"
  | "alternative"
  | "secondary"
  | "undefault"
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
      className="rounded-md font-bold
        bg-dark-blue-100 hover:bg-white enabled:hover:text-dark-blue-100 border enabled:border-dark-blue-100 text-white font-sans py-2 px-8 flex space-x-4;
        disabled:bg-dark-blue-60 flex-col items-center"
    >
      {children}
    </button>
  )
}

const AlternativeButton = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className=" rounded-md font-bold
      bg-light-blue-100 enabled:hover:bg-white enabled:hover:text-light-blue-100 border enabled:border-light-blue-100 text-white py-2 px-8 flex space-x-4;
      disabled:bg-light-blue-60 flex-col items-center"
    >
      {children}
    </button>
  )
}

const SecondaryButton = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className="rounded-md font-bold 
       justify-center
      bg-orange hover:bg-white enabled:hover:text-orange border enabled:border-orange text-white font-p py-2 px-8 flex space-x-4;
      disabled:bg-orange-60 flex-col items-center
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
  }
  return <DefaultButton {...props}>{children}</DefaultButton>
}

export default Button
