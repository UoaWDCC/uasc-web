import TextInput from "../TextInputComponent/TextInput"

import AlertsComponent from "../AlertsComponent/AlertsComponent"

import { type FormEvent, useState } from "react"

export type HandlerResponse = {
  /**
   * If the setup worked
   */
  success: boolean
  /**
   * *Custom* message to display to the user on successful signup
   */
  successMessage?: string
  error?: {
    /**
     * The reason for the sign up failing
     */
    message: string
  }
}

type MessageTypes = {
  /**
   * Message to display on successful signup
   */
  success?: string
  /**
   * Message to display on failed signup
   */
  error?: string
  /**
   * Misc messages
   */
  other?: string
}

type FormState = {
  /**
   * The password that the user enters (wants to change their password to)
   */
  firstPassword: string

  /**
   * The *confirm* password that the user enters, which should be checked
   * against `firstPassword`
   */
  secondPassword: string
}

interface IPasswordSetupForm {
  /**
   * Called when the user requests a password change. Should return a
   * promise with the results of the attempted password change
   *
   * @param password the *confirmed* password that the user wants to use
   * as the new password
   */
  passwordSetUpHandler?: (password: string) => Promise<HandlerResponse>
  /**
   * A react `ref`
   */
  formRef?: React.RefObject<HTMLFormElement>
  /**
   * Callback to use if the password setup was successful
   */
  successHandler?: () => void
}

export const PasswordSetupForm = ({
  passwordSetUpHandler,
  formRef,
  successHandler
}: IPasswordSetupForm) => {
  const [formData, setFormData] = useState<FormState>({
    firstPassword: "",
    secondPassword: ""
  })
  const [messages, setMessages] = useState<MessageTypes>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading || !passwordSetUpHandler) return

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
    <div>
      <form onSubmit={(event) => handleSubmit(event)} ref={formRef}>
        <div className="flex flex-col gap-5">
          <div>
            <p>Password</p>
            <TextInput
              className="w-full rounded lg:w-3/4"
              onChange={(e) =>
                setFormData({ ...formData, firstPassword: e.target.value })
              }
              type="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
              data-testid="new-password-input"
            />
          </div>
          <div>
            <p>Confirm password</p>
            <TextInput
              className="w-full rounded lg:w-3/4"
              type="password"
              onChange={(e) =>
                setFormData({ ...formData, secondPassword: e.target.value })
              }
              data-testid="confirm-password-input"
              required
            />
          </div>
        </div>
        <p className="pb-[20px] pt-[24px]">
          You can reset your password at any time.
        </p>
      </form>
      {messages.success && <AlertsComponent message={messages.success} />}
      {messages.error && (
        <AlertsComponent variant="error" message={messages.error} />
      )}
    </div>
  )
}
