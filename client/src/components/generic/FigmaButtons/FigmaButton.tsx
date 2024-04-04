type buttonVariants = "default" | "alternative" | "secondary"

interface props {
  children?: React.ReactNode
  variant?: buttonVariants
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

const DefaultButton = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
        bg-dark-blue-100 hover:bg-white hover:text-dark-blue-100 border border-dark-blue-100 text-white font-sans py-2 px-4 rounded-md;
        "
    >
      {children}
    </button>
  )
}

const AlternativeButton = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
      bg-light-blue-100 hover:bg-white hover:text-light-blue-100 border border-light-blue-100 text-white font-sans py-2 px-4 rounded-md;
      "
    >
      {children}
    </button>
  )
}

const SecondaryButton = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
      bg-orange hover:bg-white hover:text-orange border border-orange text-white font-sans py-2 px-4 rounded-md;
    "
    >
      {children}
    </button>
  )
}

const Button = ({ children, variant, props }: props) => {
  switch (variant) {
    case "default":
      return <DefaultButton props={props}>{children}</DefaultButton>
    case "alternative":
      return <AlternativeButton props={props}>{children}</AlternativeButton>
    case "secondary":
      return <SecondaryButton props={props}>{children}</SecondaryButton>
  }
  return <DefaultButton props={props}>{children}</DefaultButton>
}

export default Button
