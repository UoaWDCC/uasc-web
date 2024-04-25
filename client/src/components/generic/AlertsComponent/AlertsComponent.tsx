import BellIcon from "assets/icons/bell.svg?react"
import TickIcon from "assets/icons/tick.svg?react"
import WarningIcon from "assets/icons/warning.svg?react"
import XIcon from "assets/icons/x.svg?react"

type AlertsInputProp = {
  message: string
  variant?: "success" | "notification" | "error"
}

const AlertsComponent = ({ variant, message }: AlertsInputProp) => {
  if (variant === "success") {
    return (
      <div className="flex h-12 w-full items-center justify-between rounded-lg bg-[#109D27] text-left uppercase text-white">
        <div className="ml-10 mr-5 h-5 w-5">
          <TickIcon className="fill-white" />
        </div>
        <span className="absolute left-20 ml-10"> {message} </span>
        <div className="mr-10 h-5 w-5">
          <XIcon className="fill-white" />
        </div>
      </div>
    )
  } else if (variant === "error") {
    return (
      <div className="flex h-12 w-full items-center justify-between rounded-lg bg-[#9A141D] text-left uppercase text-white">
        <div className="ml-10 mr-5 h-5 w-5">
          <WarningIcon className="fill-white" />
        </div>
        <span className="absolute left-20 ml-10"> {message} </span>
        <div className="mr-10 h-5 w-5">
          <XIcon className="fill-white" />
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex h-12 w-full items-center justify-between rounded-lg bg-[#FF6D04] text-left uppercase text-white">
        <div className="ml-10 mr-5 h-5 w-5">
          <BellIcon className="fill-white" />
        </div>
        <span className="absolute left-20 ml-10"> {message} </span>
        <div className="mr-10 h-5 w-5">
          <XIcon className="fill-white" />
        </div>
      </div>
    )
  }
}

export default AlertsComponent
