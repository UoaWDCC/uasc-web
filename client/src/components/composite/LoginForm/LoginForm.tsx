import { FormEvent, useState } from "react"
import TextInput from "@/components/generic/TextInputComponent/TextInput"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import Link from "next/link"

export type LoginHandlerArgs = {
  email: string
  password: string
}

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
  email: string
  password: string
}

/**
 * Needs return true on success
 */
interface ILoginForm {
  loginHandler?: ({
    email,
    password
  }: LoginHandlerArgs) => Promise<HandlerResponse>
  passwordResetHandler?: () => void
  successHandler?: () => void
}

const LoginForm = ({
  passwordResetHandler,
  loginHandler,
  successHandler
}: ILoginForm) => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: ""
  })
  const [loginSuccessful, setLoginSuccessful] = useState(false)
  const [messages, setMessages] = useState<MessageTypes>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading || !loginHandler) return
    try {
      setIsLoading(true)
      const { success, error } = await loginHandler({
        email: formData.email,
        password: formData.password
      })

      setIsLoading(false)
      if (success) {
        setLoginSuccessful(true)
        setMessages({ success: "Logged In" })
        if (successHandler !== undefined) successHandler()
        alert("Logged In!")
      } else {
        setLoginSuccessful(false)
        // We want the messages to be overwritten
        setMessages({ error: error?.message || "Unknown Error Occured" })
      }
    } catch (e) {
      console.error(e)
      setLoginSuccessful(false)
      setIsLoading(false)
    }
  }

  return (
    <div
      className="bg-gray-1 w-full max-w-[400px] 
                    rounded-md border border-black px-1 py-8 sm:px-5"
    >
      <h2 className="italic">Login</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="mt-8 flex flex-col gap-5">
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
          <div>
            <p className="mb-1">Password</p>
            <TextInput
              data-testid="password-input"
              value={formData.password}
              type="password"
              id="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
        </div>
        <h5
          data-testid="reset-password-button"
          className="text-dark-blue-100 mb-10 mt-3 cursor-pointer uppercase"
          onClick={passwordResetHandler}
        >
          Forgot your password?
        </h5>
        <span className="flex gap-2">
          <Button
            data-testid="login-button"
            type="submit"
            disabled={isLoading || loginSuccessful}
            variant="default-sm"
          >
            Login
          </Button>
          <Link href="/register" className="flex">
            <Button variant="inverted-default-sm">Register</Button>
          </Link>
        </span>
        <div className="mt-6 uppercase">
          {messages.success && (
            <h5 className="font-bold">{messages.success}</h5>
          )}
          {messages.error && <h5 className="font-bold">{messages.error}</h5>}
        </div>
      </form>
    </div>
  )
}

export default LoginForm
