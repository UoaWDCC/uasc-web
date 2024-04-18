import { render, fireEvent, waitFor } from "@testing-library/react"
import PasswordResetForm from "./PasswordResetForm"

describe("PasswordResetForm", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<PasswordResetForm />)
    expect(getByTestId("email-input")).toBeInTheDocument()
    expect(getByTestId("back-button")).toBeInTheDocument()
    expect(getByTestId("reset-button")).toBeInTheDocument()
  })

  it("handles form submission", async () => {
    const passwordResetHandler = jest
      .fn()
      .mockResolvedValue({ success: true, successMessage: "Success" })
    const successHandler = jest.fn()
    const { getByTestId } = render(
      <PasswordResetForm
        passwordResetHandler={passwordResetHandler}
        successHandler={successHandler}
      />
    )

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "test@example.com" }
    })
    fireEvent.click(getByTestId("reset-button"))

    await waitFor(() => {
      expect(passwordResetHandler).toHaveBeenCalledWith("test@example.com")
      expect(successHandler).toHaveBeenCalled()
    })
  })

  it("handles form submission error", async () => {
    const passwordResetHandler = jest
      .fn()
      .mockResolvedValue({ success: false, error: { message: "Error" } })
    const { getByTestId } = render(
      <PasswordResetForm passwordResetHandler={passwordResetHandler} />
    )

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "test@example.com" }
    })
    fireEvent.click(getByTestId("reset-button"))

    await waitFor(() => {
      expect(passwordResetHandler).toHaveBeenCalledWith("test@example.com")
      expect(getByTestId("error-message")).toHaveTextContent("Error")
    })
  })

  it("handles back button click", () => {
    const backHandler = jest.fn()
    const { getByTestId } = render(
      <PasswordResetForm backHandler={backHandler} />
    )

    fireEvent.click(getByTestId("back-button"))
    expect(backHandler).toHaveBeenCalled()
  })
})
