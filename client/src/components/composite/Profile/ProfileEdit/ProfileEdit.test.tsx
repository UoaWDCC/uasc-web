import { render, screen, fireEvent } from "@testing-library/react"
import ProfileEdit from "./ProfileEdit"

describe("ProfileEdit", () => {
  const fields = [
    { fieldName: "first_name", defaultFieldValue: "John" },
    { fieldName: "last_name", defaultFieldValue: "Doe" },
    { fieldName: "does_snowboarding", defaultFieldValue: true },
    {
      fieldName: "date_of_birth",
      defaultFieldValue: { seconds: 946684800, nanoseconds: 0 } // 2000-01-01
    }
  ]

  it("renders the title and fields", () => {
    render(
      <ProfileEdit
        title="Edit Profile"
        fields={fields}
        onClose={jest.fn()}
        onEdit={jest.fn()}
      />
    )
    expect(screen.getByText("Edit Profile")).toBeInTheDocument()
    expect(screen.getByLabelText("First Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Does Snowboarding")).toBeInTheDocument()
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument()
  })

  it("calls onEdit with updated values on submit", () => {
    const onEdit = jest.fn()
    render(
      <ProfileEdit
        title="Edit Profile"
        fields={fields}
        onClose={jest.fn()}
        onEdit={onEdit}
      />
    )
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Jane" }
    })
    fireEvent.click(screen.getByRole("button", { name: /update details/i }))
    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ first_name: "Jane" })
    )
  })

  it("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn()
    render(
      <ProfileEdit
        title="Edit Profile"
        fields={fields}
        onClose={onClose}
        onEdit={jest.fn()}
      />
    )
    const closeButton = screen.getByRole("button", {
      hidden: true,
      name: "Close"
    })
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalled()
  })
})
