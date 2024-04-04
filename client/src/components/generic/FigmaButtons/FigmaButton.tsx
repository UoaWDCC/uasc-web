type buttonVariants =
  | "default"
  | "alternative"
  | "secondary"
  | "undefault"
  | "unalternative"
  | "unsecondary"

interface props {
  children?: React.ReactNode
  variant?: buttonVariants
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

const DefaultButton = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="rounded-md font-bold
        bg-dark-blue-100 hover:bg-white hover:text-dark-blue-100 border border-dark-blue-100 text-white font-sans py-2 px-8 flex space-x-4;
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
      className=" rounded-md font-bold
      bg-light-blue-100 hover:bg-white hover:text-light-blue-100 border border-light-blue-100 text-white font-sans py-2 px-8 flex space-x-4;
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
      className="rounded-md font-bold
      bg-orange hover:bg-white hover:text-orange border border-orange text-white font-sans py-2 px-8 flex space-x-4;
    "
    >
      {children}
    </button>
  )
}

// disabled versions
const Undefault = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="rounded-md font-bold
        bg-dark-blue-60 text-gray-2 font-sans py-2 px-8 flex space-x-4;
        "
    >
      {children}
    </button>
  )
}

const Unalternative = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className=" rounded-md font-bold
      bg-light-blue-60 text-white font-sans py-2 px-8 flex space-x-4 text-gray-2;
      "
    >
      {children}
    </button>
  )
}

const Unsecondary = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="rounded-md font-bold
      bg-orange-60 text-gray-2 font-sans py-2 px-8 flex space-x-4;
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
    case "undefault":
      return <Undefault props={props}>{children}</Undefault>
    case "unalternative":
      return <Unalternative props={props}>{children}</Unalternative>
    case "unsecondary":
      return <Unsecondary props={props}>{children}</Unsecondary>
  }
  return <DefaultButton props={props}>{children}</DefaultButton>
}

export default Button
