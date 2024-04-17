type dialogVariants = "default"

interface IDialogProps {
  title: string
  text: string
  variant?: dialogVariants
}

type props = IDialogProps

const ConfirmationDialog = ({ title, text }: props) => {
  return (
    <div className="h-215 w-full border border">
      <h1 className="sm:text-h2 font-style: w-full text-lg font-bold italic">
        {title}
      </h1>
      {text}
    </div>
  )
}

const Dialog = ({ title, text, variant }: props) => {
  switch (variant) {
    case "default":
      return <ConfirmationDialog title={title} text={text} />
  }
  return <ConfirmationDialog title={title} text={text} />
}

export default Dialog
