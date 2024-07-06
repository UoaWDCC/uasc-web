"use client"

import { useState } from "react"
import BellIcon from "@/assets/icons/bell.svg"
import TickIcon from "@/assets/icons/tick.svg"
import WarningIcon from "@/assets/icons/warning.svg"
import XIcon from "@/assets/icons/x.svg"

type AlertsInputProp = {
  message: string
  variant?: "success" | "notification" | "error"
  isButton?: boolean
}

const AlertsComponent = ({ variant, message, isButton }: AlertsInputProp) => {
  const [modalOpen, setModalOpen] = useState<boolean>(true)

  const SuccessAlert = () => {
    return (
      <div className="bg-green flex h-12 w-full items-center rounded-lg md:justify-between">
        <div className="ml-10 mr-5 h-5 w-5">
          <TickIcon alt="tick icon" className="fill-white" />
        </div>
        <span className="xs:text-sm xs:text-center xxs:text-xs xxs:text-center left-20 px-1 uppercase text-white md:absolute md:ml-10">
          {""}
          {message}
          {""}
        </span>

        {isButton && (
          <button
            className="mr-5 h-5 w-5 hover:scale-110 hover:opacity-80"
            onClick={() => setModalOpen(false)}
          >
            <XIcon className="fill-white" />
          </button>
        )}
      </div>
    )
  }

  const ErrorAlert = () => {
    return (
      <div className="bg-red flex h-12 w-full items-center rounded-lg md:justify-between">
        <div className="ml-10 mr-5 h-5 w-5">
          <WarningIcon className="fill-white" />
        </div>
        <span className="xs:text-sm xs:text-center xxs:text-xs xxs:text-center left-20 px-1 uppercase text-white md:absolute md:ml-10">
          {""}
          {message}
          {""}
        </span>

        {isButton && (
          <button
            className="mr-5 h-5 w-5 hover:scale-110 hover:opacity-80"
            onClick={() => setModalOpen(false)}
          >
            <XIcon className="fill-white" />
          </button>
        )}
      </div>
    )
  }

  const NotificationAlert = () => {
    return (
      <div className="bg-orange flex h-12 w-full items-center rounded-lg md:justify-between">
        <div className="ml-10 mr-5 h-5 w-5">
          <BellIcon className="fill-white" />
        </div>
        <span className="xs:text-sm xs:text-center xxs:text-xs xxs:text-center left-20 px-1 uppercase text-white md:absolute md:ml-10">
          {""}
          {message}
          {""}
        </span>

        {isButton && (
          <button
            className="mr-5 h-5 w-5 hover:scale-110 hover:opacity-80"
            onClick={() => setModalOpen(false)}
          >
            <XIcon className="fill-white" />
          </button>
        )}
      </div>
    )
  }

  if (variant === "success") {
    if (!modalOpen) {
      return null
    }
    return SuccessAlert()
  } else if (variant === "error") {
    if (!modalOpen) {
      return null
    }
    return ErrorAlert()
  } else {
    if (!modalOpen) {
      return null
    }
    return NotificationAlert()
  }
}

export default AlertsComponent
