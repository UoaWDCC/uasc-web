import Button from "../FigmaButtons/FigmaButton"

interface IExitConfirmationProps {
  title: string
  message: string
  confirmHandler?: () => void
  declineHandler?: () => void
}

const ExitConfirmation = ({ title, message, confirmHandler, declineHandler }: IExitConfirmationProps) => {
    return (
      <>
      <div className="flex flex-col px-[20px] py-[32px] gap-[10px] w-fit h-fit bg-gray-1 dialog-shadow">
        <h3 className="text-dark-blue-100">{title}</h3>
        <h5 className="text-dark-blue-100 font-bold">{message}</h5>        
        <div className="flex mt-[10px] w-full space-x-[20px]">
            <Button variant = "inverted-default-st" onClick={confirmHandler}>Yes</Button>
            <Button onClick={declineHandler}>No</Button>
        </div>
      </div>
      </>
    )
  }

export default ExitConfirmation
