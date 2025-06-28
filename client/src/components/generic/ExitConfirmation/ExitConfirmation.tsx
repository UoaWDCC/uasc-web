import Button from "../FigmaButtons/FigmaButton"

interface IExitConfirmationProps {
  title: string
  message: string
  confirmHandler?: () => void
  declineHandler?: () => void
}

const ExitConfirmation = ({
  title,
  message,
  confirmHandler,
  declineHandler
}: IExitConfirmationProps) => {
  return (
    <div className="bg-gray-1 dialog-shadow flex h-fit w-fit flex-col gap-[10px] px-[20px] py-[32px]">
      <h3 className="text-dark-blue-100">{title}</h3>
      <h5 className="text-dark-blue-100 font-bold">{message}</h5>
      <div className="mt-[10px] flex w-full space-x-[20px]">
        <Button variant="inverted-default-st" onClick={confirmHandler}>
          Yes
        </Button>
        <Button onClick={declineHandler}>No</Button>
      </div>
    </div>
  )
}

export default ExitConfirmation
