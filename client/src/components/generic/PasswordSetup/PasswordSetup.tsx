/*
import { updatePassword } from "firebase/auth"

updatePassword().then(()=>{

}).catch((error)=>{

}) */

import TextInput from "../TextInputComponent/TextInput"

import AlertsComponent from "../AlertsComponent/AlertsComponent"

import { FormEvent, useState } from "react"

export type HandlerResponse = {
  success: boolean
  successMessage?: string
  error?: {
    message: string
  }
}

type MessageTypes = {
  success?: string
  error?: string
  other?: string
}

type FormState = {
  firstPassword: string
  secondPassword: string
}

interface IPasswordSetup {
  passwordSetUpHandler?: (firstPassword: string) => Promise<HandlerResponse>
  formRef?: React.RefObject<HTMLFormElement>
  successHandler?: () => void
  backHandler?: () => void
}

export const PasswordSetup = ({
  passwordSetUpHandler,
  formRef,
  successHandler
}: IPasswordSetup) => {
  const [formData, setFormData] = useState<FormState>({
    firstPassword: "",
    secondPassword: ""
  })
  const [messages, setMessages] = useState<MessageTypes>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (
      isLoading ||
      !passwordSetUpHandler ||
      event.currentTarget.checkValidity()
    )
      return

    if (formData.firstPassword !== formData.secondPassword) {
      setMessages({
        error: "Your passwords have to match"
      })
      return
    }
    try {
      setIsLoading(true)
      const { success, successMessage, error } = await passwordSetUpHandler(
        formData.firstPassword
      )

      setIsLoading(false)
      if (success) {
        setMessages({
          success: successMessage
        })
        if (successHandler !== undefined) successHandler()
      } else {
        setMessages({
          error: error?.message || "Your passwords have to match"
        })
      }
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={(event) => handleSubmit(event)} ref={formRef}>
        <div>
          <p>Password</p>
          <TextInput
            className="rounded"
            onChange={(e) =>
              setFormData({ ...formData, firstPassword: e.target.value })
            }
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
        </div>
        <div>
          <p>Confirm password</p>
          <TextInput
            className="rounded"
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, secondPassword: e.target.value })
            }
          />
        </div>
        <p>You can reset your password at any time.</p>
      </form>
      {messages.success && <AlertsComponent message={messages.success} />}
      {messages.error && (
        <AlertsComponent variant="error" message={messages.error} />
      )}
    </div>
  )
}
