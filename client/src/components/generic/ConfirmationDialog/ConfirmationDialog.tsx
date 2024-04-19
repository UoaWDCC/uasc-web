import Button from "../FigmaButtons/FigmaButton"
type dialogVariants = "default"

export interface IDialogProps {
  title: string
  text: string
  variant?: dialogVariants
  left: string
  right: string
}

type props = IDialogProps

const ConfirmationDialog = ({ title, text, left, right }: props) => {
  return (
    <div className="flex max-h-[215px] max-w-[386px] flex-col items-center rounded-md border-2 px-6 py-7 pb-10">
      <div className="flex flex-col">
        <h1 className="sm:text-h2 font-style: w-full pb-5 text-lg font-bold italic">
          {title}
        </h1>
        <p className="text-p pb-5">{text}</p>
        <span className="flex space-x-4">
          <Button data-testid="dialog-left" className="">{left}</Button>

          <Button data-testid="dialog-right" className="">{right}</Button>
        </span>
      </div>
    </div>
  )
}

const Dialog = ({ title, text, variant, left, right }: props) => {
  switch (variant) {
    case "default":
      return (
        <ConfirmationDialog
          title={title}
          text={text}
          left={left}
          right={right}
        />
      )
  }
  return (
    <ConfirmationDialog title={title} text={text} left={left} right={right} />
  )
}

export default Dialog
