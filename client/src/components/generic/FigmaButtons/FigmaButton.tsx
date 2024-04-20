import RightArrowIcon from "assets/icons/rightarrow.svg?react"
import LeftArrowIcon from "assets/icons/leftarrow.svg?react"

type buttonVariants =
  | "default"
  | "default-sm"
  | "alternative"
  | "secondary"
  | "inverted-default-sm"
  | "unalternative"
  | "unsecondary"
  | "progress-default"
  | "progress-inverted"

interface IButtonProps {
  children?: React.ReactNode
  variant?: buttonVariants
  iconSide?: "left" | "right"
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

const DefaultButtonSmall = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className="bg-dark-blue-100  border-dark-blue-100
        space-x-4; disabled:bg-dark-blue-60 text-h5 items-center rounded-md px-11 py-2 uppercase
        text-white enabled:border"
    >
      <span className="flex items-center gap-1">
        <span>{children}</span>
      </span>
    </button>
  )
}

const DefaultButtonInverted = ({ children, ...props }: props) => {
  return (
    <button
      {...props}
      className={
        "border-dark-blue-100 text-h5 text-dark-blue-100 rounded-md border px-8 py-1 font-bold uppercase " +
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

const IconWrapperStyle = "mt-[2px] flex h-4 w-3" as const

const DefaultProgressButton = ({
  iconSide = "right",
  children,
  ...props
}: props) => {
  return (
    <button
      {...props}
      className="bg-dark-blue-100  border-dark-blue-100
        space-x-4; disabled:bg-dark-blue-60 text-h5 items-center rounded-md px-11 py-2 uppercase
        text-white enabled:border"
    >
      <span className="flex items-center gap-1">
        {iconSide === "left" && (
          <div className={IconWrapperStyle}>
            <LeftArrowIcon className="fill-white" />
          </div>
        )}
        <span>{children}</span>
        {iconSide === "right" && (
          <div className={IconWrapperStyle}>
            <RightArrowIcon className="fill-white" />
          </div>
        )}
      </span>
    </button>
  )
}

const InvertedProgressButton = ({
  iconSide = "left",
  children,
  ...props
}: props) => {
  return (
    <button
      {...props}
      className="bg-grey-1  border-dark-blue-100
        space-x-4; disabled:bg-dark-blue-60 text-h5 text-dark-blue-100 items-center rounded-md border px-11
        py-2 uppercase"
    >
      <span className="flex items-center gap-1">
        {iconSide === "left" && (
          <div className={IconWrapperStyle}>
            <LeftArrowIcon className="fill-dark-blue-100" />
          </div>
        )}
        <span>{children}</span>
        {iconSide === "right" && (
          <div className={IconWrapperStyle}>
            <RightArrowIcon className="fill-dark-blue-100" />
          </div>
        )}
      </span>
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

const Button = ({ iconSide, children, variant, ...props }: props) => {
  switch (variant) {
    case "default":
      return <DefaultButton {...props}>{children}</DefaultButton>
    case "alternative":
      return <AlternativeButton {...props}>{children}</AlternativeButton>
    case "secondary":
      return <SecondaryButton {...props}>{children}</SecondaryButton>
    case "inverted-default-sm":
      return (
        <DefaultButtonInverted {...props}>{children}</DefaultButtonInverted>
      )
    case "default-sm":
      return <DefaultButtonSmall {...props}>{children}</DefaultButtonSmall>
    case "progress-default":
      return (
        <DefaultProgressButton iconSide={iconSide} {...props}>
          {children}
        </DefaultProgressButton>
      )
    case "progress-inverted":
      return (
        <InvertedProgressButton iconSide={iconSide} {...props}>
          {children}
        </InvertedProgressButton>
      )
  }
  return <DefaultButton {...props}>{children}</DefaultButton>
}
export default Button
