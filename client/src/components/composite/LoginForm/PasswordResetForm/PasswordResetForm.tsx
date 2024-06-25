import { FormEvent, useState } from "react"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import { HandlerResponse } from "../LoginForm"

type MessageTypes = {
  success?: string
  error?: string
  other?: string
}

type FormState = {
  email: string
}

/**
 * Needs return true on success
 */
interface IPasswordResetForm {
  passwordResetHandler?: (email: string) => Promise<HandlerResponse>
  successHandler?: () => void
  backHandler?: () => void
}

const PasswordResetForm = ({
  backHandler,
  passwordResetHandler,
  successHandler
}: IPasswordResetForm) => {
  const [formData, setFormData] = useState<FormState>({
    email: ""
  })
  const [messages, setMessages] = useState<MessageTypes>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading || !passwordResetHandler) return
    try {
      setIsLoading(true)
      const { success, successMessage, error } = await passwordResetHandler(
        formData.email
      )

      setIsLoading(false)
      if (success) {
        setMessages({ success: successMessage })
        if (successHandler !== undefined) successHandler()
      } else {
        // We want the messages to be overwritten
        setMessages({ error: error?.message || "Unknown Error Occured" })
      }
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  return (
    <div
      className="bg-gray-1 w-full max-w-[400px] 
                    rounded-md border border-black px-1 py-8 sm:px-5"
    >
      <h2 className="italic">Reset Password</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="my-8 flex flex-col gap-5">
          <div>
            <p className="mb-1">Email</p>
            <TextInput
              data-testid="email-input"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>
        <span className="flex gap-1">
          <Button
            data-testid="back-button"
            onClick={backHandler}
            disabled={isLoading}
            variant="progress-inverted"
          >
            Back
          </Button>
          <Button
            data-testid="reset-button"
            type="submit"
            disabled={isLoading}
            variant="default-sm"
          >
            Reset
          </Button>
        </span>
        {messages.success && <h5>{messages.success}</h5>}
        {messages.error && <h5>{messages.error}</h5>}
      </form>
    </div>
  )
}

export default PasswordResetForm
