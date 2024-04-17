import Button from "../FigmaButtons/FigmaButton"
type dialogVariants = "default"

interface IDialogProps {
  title: string
  text: string
  variant?: dialogVariants
  buttonText1: string
  buttonText2: string
}

type props = IDialogProps

const ConfirmationDialog = ({
  title,
  text,
  buttonText1,
  buttonText2
}: props) => {
  return (
    <div className="max-h-[215px] w-full rounded-md border border px-6 py-7 pb-10">
      <h1 className="sm:text-h2 font-style: w-full pb-5 text-lg font-bold italic">
        {title}
      </h1>
      <p className="text-p pb-5">{text}</p>
      <span className="flex space-x-4">
        <Button className="">{buttonText1}</Button>

        <Button className="">{buttonText2}</Button>
      </span>
    </div>
  )
}

const Dialog = ({ title, text, variant, buttonText1, buttonText2 }: props) => {
  switch (variant) {
    case "default":
      return (
        <ConfirmationDialog
          title={title}
          text={text}
          buttonText1={buttonText1}
          buttonText2={buttonText2}
        />
      )
  }
  return (
    <ConfirmationDialog
      title={title}
      text={text}
      buttonText1={buttonText1}
      buttonText2={buttonText2}
    />
  )
}

export default Dialog
