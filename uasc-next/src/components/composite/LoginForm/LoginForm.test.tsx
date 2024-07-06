import { render, fireEvent, waitFor } from "@testing-library/react"
import LoginForm, { LoginHandlerArgs, HandlerResponse } from "./LoginForm"

describe("LoginForm", () => {
  describe("Login Functionality", () => {
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
  describe("Password reset functionality", () => {
    let mockLoginHandler: any,
      mockPasswordResetHandler: any,
      mockSuccessHandler: any

    beforeEach(() => {
      mockLoginHandler = jest.fn()
      mockPasswordResetHandler = jest.fn()
      mockSuccessHandler = jest.fn()
    })

    it("calls passwordResetHandler when reset password is clicked", async () => {
      const { getByTestId } = render(
        <LoginForm
          loginHandler={mockLoginHandler}
          passwordResetHandler={mockPasswordResetHandler}
          successHandler={mockSuccessHandler}
        />
      )

      fireEvent.click(getByTestId("reset-password-button"))

      await waitFor(() => {
        expect(mockPasswordResetHandler).toHaveBeenCalled()
      })
    })

    it("does not call loginHandler when reset password is clicked", async () => {
      const { getByTestId } = render(
        <LoginForm
          loginHandler={mockLoginHandler}
          passwordResetHandler={mockPasswordResetHandler}
          successHandler={mockSuccessHandler}
        />
      )

      fireEvent.click(getByTestId("reset-password-button"))

      await waitFor(() => {
        expect(mockLoginHandler).not.toHaveBeenCalled()
      })
    })

    it("does not call successHandler when reset password is clicked", async () => {
      const { getByTestId } = render(
        <LoginForm
          loginHandler={mockLoginHandler}
          passwordResetHandler={mockPasswordResetHandler}
          successHandler={mockSuccessHandler}
        />
      )

      fireEvent.click(getByTestId("reset-password-button"))

      await waitFor(() => {
        expect(mockSuccessHandler).not.toHaveBeenCalled()
      })
    })
  })
})
