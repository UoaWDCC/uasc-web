import { render, fireEvent, waitFor } from "@testing-library/react"
import { PasswordSetupForm } from "./PasswordSetupForm"
import { createRef } from "react"

const MockPasswordSetupFormConsumer = ({
  mockSetupHandler,
  mockSuccessHandler
}: {
  mockSetupHandler: any
  mockSuccessHandler: any
}) => {
  const formRef = createRef<HTMLFormElement>()
  const submit = () => {
    formRef.current?.requestSubmit()
  }
  return (
    <>
      <PasswordSetupForm
        passwordSetUpHandler={mockSetupHandler}
        successHandler={mockSuccessHandler}
        formRef={formRef}
      />
      <button onClick={() => submit()} data-testid="submit-button">
        submit
      </button>
    </>
  )
}

describe("PasswordResetForm", () => {
  it("does not allow submission on weak password", async () => {
    const passwordSetupHandler = jest
      .fn()
      .mockResolvedValue({ success: true, successMessage: "Success" })
    const successHandler = jest.fn()
    const { getByTestId } = render(
      <MockPasswordSetupFormConsumer
        mockSetupHandler={passwordSetupHandler}
        mockSuccessHandler={successHandler}
      />
    )

    fireEvent.change(getByTestId("new-password-input"), {
      target: { value: "1234" }
    })
    fireEvent.click(getByTestId("submit-button"))

    await waitFor(() => {
      expect(passwordSetupHandler).not.toHaveBeenCalled()
      expect(successHandler).not.toHaveBeenCalled()
    })
  })

  it("allows submission only when passwords match and is strong", async () => {
    const passwordSetupHandler = jest
      .fn()
      .mockResolvedValue({ success: true, successMessage: "Success" })
    const successHandler = jest.fn()
    const { getByTestId } = render(
      <MockPasswordSetupFormConsumer
        mockSetupHandler={passwordSetupHandler}
        mockSuccessHandler={successHandler}
      />
    )

    /**
     * Valid case
     */
    fireEvent.change(getByTestId("new-password-input"), {
      target: { value: "abcdef12@A" }
    })

    fireEvent.change(getByTestId("confirm-password-input"), {
      target: { value: "abcdef12@A" }
    })

    expect(getByTestId("submit-button")).toBeInTheDocument()

    fireEvent.click(getByTestId("submit-button"))

    await waitFor(() => {
      expect(passwordSetupHandler).toHaveBeenCalled()
      expect(successHandler).toHaveBeenCalled()
    })

    jest.clearAllMocks()

    /**
     * Invalid case
     */
    fireEvent.change(getByTestId("new-password-input"), {
      target: { value: "abcdef12@A" }
    })

    fireEvent.change(getByTestId("confirm-password-input"), {
      target: { value: "abcdef" }
    })

    await waitFor(() => {
      expect(passwordSetupHandler).not.toHaveBeenCalled()
      expect(successHandler).not.toHaveBeenCalled()
    })

    jest.clearAllMocks()

    /**
     * Passwords match but is weak
     */
    fireEvent.change(getByTestId("new-password-input"), {
      target: { value: "abcdef" }
    })

    fireEvent.change(getByTestId("confirm-password-input"), {
      target: { value: "abcdef" }
    })

    await waitFor(() => {
      expect(passwordSetupHandler).not.toHaveBeenCalled()
      expect(successHandler).not.toHaveBeenCalled()
    })
  })

  it("should not submit an empty form", async () => {
    const passwordSetupHandler = jest
      .fn()
      .mockResolvedValue({ success: true, successMessage: "Success" })
    const successHandler = jest.fn()
    const { getByTestId } = render(
      <MockPasswordSetupFormConsumer
        mockSetupHandler={passwordSetupHandler}
        mockSuccessHandler={successHandler}
      />
    )

    fireEvent.change(getByTestId("new-password-input"), {
      target: { value: "" }
    })

    fireEvent.change(getByTestId("confirm-password-input"), {
      target: { value: "" }
    })

    expect(getByTestId("submit-button")).toBeInTheDocument()

    fireEvent.click(getByTestId("submit-button"))

    await waitFor(() => {
      expect(passwordSetupHandler).not.toHaveBeenCalled()
      expect(successHandler).not.toHaveBeenCalled()
    })
  })
})
