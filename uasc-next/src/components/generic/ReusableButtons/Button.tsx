type buttonVariants = "v1" | "v2" | "signup" | "small"
interface props {
  children?: React.ReactNode
  variant?: buttonVariants
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

const V1 = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
          before:ease w-50 relative 
          relative 
          m-8 flex h-12
          h-[60px] overflow-hidden
          rounded-full 
          border border-black bg-transparent 
          p-3 
          font-semibold before:absolute 
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
          hover:bg-blue-200 
          hover:text-white 
          hover:before:-rotate-180"
    >
      <span className="relative z-10 hover:text-white">{children}</span>
    </button>
  )
}

const V2 = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
        relative m-8 flex 
        h-[50px]
        w-40 items-center 
        justify-center 
        overflow-hidden 
        rounded-full 
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
      "
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

const SignUp = ({ children, props }: props) => {
  return (
    <button
      {...props}
      className="
        relative m-8 flex 
        h-[60px] w-40
        items-center 
        justify-center 
        overflow-hidden 
        border 
        border-black
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
        hover:before:w-56"
    >
      <span className="relative z-10 hover:text-white">{children}</span>
    </button>
  )
}

const Small = ({ children, props }: props) => {
  return (
    <button
      {...props}
      type="button"
      className="
        position:relative
        dark:focus: 
        ml-8 
        rounded-lg bg-gradient-to-r from-blue-500 
        via-blue-600 
        to-blue-700 
        px-5 
        py-2.5 
        text-center
        text-sm 
        font-medium text-white shadow-lg shadow-blue-500/50 
        ring-blue-800 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80"
    >
      {children}
    </button>
  )
}
const Button = ({ children, variant, props }: props) => {
  switch (variant) {
    case "v1":
      return <V1 props={props}>{children}</V1>
    case "v2":
      return <V2 props={props}>{children}</V2>
    case "signup":
      return <SignUp props={props}>{children}</SignUp>
    case "small":
      return <Small props={props}>{children}</Small>
  }
  return <V1 props={props}>{children}</V1>
}

export default Button
