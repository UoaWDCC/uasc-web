import { render, fireEvent, waitFor } from "@testing-library/react"
import LoginForm, { LoginHandlerArgs, HandlerResponse } from "./LoginForm"

describe("LoginForm", () => {
  it("submits the form with email and password", async () => {
    const loginHandler = jest.fn(
      ({ email, password }: LoginHandlerArgs): Promise<HandlerResponse> => {
        return Promise.resolve({
          success: email === "test@example.com" && password === "password"
        })
      }
    )

    const { getByTestId } = render(<LoginForm loginHandler={loginHandler} />)

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "test@example.com" }
    })
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "password" }
    })

    fireEvent.click(getByTestId("login-button"))

    await waitFor(() => {
      expect(loginHandler).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password"
      })
    })
  })

  it("displays success message on successful login", async () => {
    const loginHandler = jest.fn().mockResolvedValue({ success: true })

    const { getByTestId, findByText } = render(
      <LoginForm loginHandler={loginHandler} />
    )

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "test@example.com" }
    })
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "password" }
    })

    fireEvent.click(getByTestId("login-button"))

    const successMessage = await findByText("Logged In")

    expect(successMessage).toBeInTheDocument()
  })

  it("displays error message on failed login", async () => {
    const loginHandler = jest.fn().mockResolvedValue({
      success: false,
      error: { message: "Invalid credentials" }
    })

    const { getByTestId, findByText } = render(
      <LoginForm loginHandler={loginHandler} />
    )

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "test@example.com" }
    })
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "password" }
    })

    fireEvent.click(getByTestId("login-button"))

    const errorMessage = await findByText("Invalid credentials")

    expect(errorMessage).toBeInTheDocument()
  })
})
