import { render, fireEvent } from "@testing-library/react"
import AdminUserCreationModal, {
  AdminUserCreationFormKeys
} from "./AdminUserCreationModal"
import { Timestamp } from "firebase/firestore"

describe("AdminUserCreationModal", () => {
  let confirmSpy: any
  beforeAll(() => {
    confirmSpy = jest.spyOn(window, "confirm")
    confirmSpy.mockImplementation(jest.fn(() => true))
  })
  afterAll(() => confirmSpy.mockRestore())
  it("calls userCreationHandler with correct parameters", () => {
    const mockHandler = jest.fn()
    const { getByTestId } = render(
      <AdminUserCreationModal userCreationHandler={mockHandler} />
    )

    fireEvent.change(getByTestId(AdminUserCreationFormKeys.FIRST_NAME), {
      target: { value: "John" }
    })
    fireEvent.change(getByTestId(AdminUserCreationFormKeys.LAST_NAME), {
      target: { value: "Doe" }
    })
    fireEvent.change(getByTestId(AdminUserCreationFormKeys.EMAIL), {
      target: { value: "john.doe@example.com" }
    })
    fireEvent.change(
      getByTestId(AdminUserCreationFormKeys.DIETARY_REQUIREMENTS),
      {
        target: { value: "Vegan" }
      }
    )
    fireEvent.change(getByTestId(AdminUserCreationFormKeys.PHONE_NUMBER), {
      target: { value: "1234567890" }
    })
    fireEvent.change(getByTestId(AdminUserCreationFormKeys.DATE_OF_BIRTH), {
      target: { value: "1990-01-01" }
    })
    fireEvent.change(getByTestId(AdminUserCreationFormKeys.MEMBERSHIP_TYPE), {
      target: { value: "member" }
    })

    fireEvent.click(getByTestId("add-new-member-button"))

    expect(mockHandler).toHaveBeenCalledWith(
      {
        email: "john.doe@example.com",
        user: {
          // Don't care
          date_of_birth: Timestamp.fromMillis(0),
          first_name: "John",
          last_name: "Doe",
          dietary_requirements: "Vegan",
          phone_number: 1234567890
        }
      },
      true
    )
  })
})
