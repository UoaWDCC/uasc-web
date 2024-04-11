import Button from "../FigmaButtons/FigmaButton"

interface IExitConfirmationProps {
  title: string
  message: string
  confirmHandler?: () => void
  declineHandler?: () => void
}

const ExitConfirmation = ({ title, message }: IExitConfirmationProps) => {
  return (
    <>
      <h3 className="text-dark-blue-100">{title}</h3>
      <h5 className="text-dark-blue-100">{message}</h5>
      <div className="flex">
        <Button onClick={() => console.log("clicked")}>Yes</Button>
        <Button>No</Button>
      </div>
    </>
  )
}

export default ExitConfirmation
