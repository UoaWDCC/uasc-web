type dialogVariants = "default"

interface IDialogProps {
  text: string
  variant?: dialogVariants
}

type props = IDialogProps

const ConfirmationDialog = ({ text }: props) => {
  return <div>{text}</div>
}

const Dialog = ({ text, variant }: props) => {
  switch (variant) {
    case "default":
      return <ConfirmationDialog text={text} />
  }
  return <ConfirmationDialog text={text} />
}

export default Dialog
