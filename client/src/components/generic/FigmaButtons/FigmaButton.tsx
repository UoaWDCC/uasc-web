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
          relative flex h-[60px] 
          bg-transparent 
          hover:bg-blue-200 p-3 m-8
          font-semibold rounded-full
          before:ease 
          relative h-12 w-50 
          overflow-hidden 
          border border-black 
          before:absolute 
          before:left-0 
          before:-ml-2 
          before:h-48 
          before:w-48 
          before:origin-top-right 
          before:-translate-x-full 
          before:translate-y-12 
          before:-rotate-90 
          before:bg-blue-700 
          before:transition-all 
          before:duration-300 
          hover:text-white 
          hover:before:-rotate-180"
    >
      <span className="relative z-10 hover:text-white">{children}</span>
    </button>
  )
}

const AlternativeButton = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
        relative flex h-[50px] 
        rounded-full
        w-40 items-center 
        justify-center 
        overflow-hidden 
        bg-blue-600 
        font-medium 
        text-white 
        shadow-2xl 
        transition-all 
        duration-300 
        before:absolute 
        before:inset-0 
        before:border-0 
        before:border-white 
        before:duration-100 
        before:ease-linear 
        hover:bg-white 
        hover:text-blue-600 
        hover:shadow-blue-600 
        hover:before:border-[25px]
        m-8
      "
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

const SecondaryButton = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
        relative flex h-[60px] 
        border border-black
        w-40 
        items-center 
        justify-center 
        overflow-hidden 
        bg-white
        text-black
        shadow-2xl 
        transition-all 
        before:absolute 
        before:h-0
        before:w-0
        before:rounded-full 
        before:bg-blue-600 
        before:duration-700 
        before:ease-out 
        hover:shadow-blue-600 
        hover:before:h-56 
        hover:before:w-56 
        m-8"
    >
      <span className="relative z-10 hover:text-white">{children}</span>
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
