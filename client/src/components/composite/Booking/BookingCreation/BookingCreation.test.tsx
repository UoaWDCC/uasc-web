import { fireEvent, render } from "@testing-library/react"
import {
  handleDateRangeInputChange,
  RequirementCheckBoxes
} from "./BookingCreation"

describe("handleDateRangeInputChange", () => {
  let setDateFunction: any
  let startDate: Date
  let endDate: Date

  beforeEach(() => {
    setDateFunction = jest.fn()
  })

  it("should swap the dates if the end date is before the start date", () => {
    startDate = new Date(2024, 5, 22)
    endDate = new Date(2024, 5, 20)

    handleDateRangeInputChange(startDate, endDate, setDateFunction)

    expect(setDateFunction).toHaveBeenCalledWith({
      startDate: endDate,
      endDate: startDate
    })
  })

  it("should not swap the dates if the end date is after the start date", () => {
    startDate = new Date(2024, 5, 20)
    endDate = new Date(2024, 5, 22)

    handleDateRangeInputChange(startDate, endDate, setDateFunction)

    expect(setDateFunction).toHaveBeenCalledWith({
      startDate,
      endDate
    })
  })
})

describe("RequirementCheckBoxes", () => {
  it("should call onValidityChange with true when all checkboxes are checked", () => {
    const mockOnValidityChange = jest.fn()
    const { getByTestId } = render(
      <RequirementCheckBoxes onValidityChange={mockOnValidityChange} />
    )

    const nightPolicyCheckbox = getByTestId("agreed-to-night-policy-checkbox")
    const bookingPolicyCheckbox = getByTestId(
      "agreed-to-general-policy-checkbox"
    )

    const dietaryRequirementsInput = getByTestId("dietary-requirements-input")

    fireEvent.click(nightPolicyCheckbox)
    fireEvent.click(bookingPolicyCheckbox)
    fireEvent.change(dietaryRequirementsInput, {
      target: { value: "i" }
    })

    expect(mockOnValidityChange).toHaveBeenCalledWith(false)

    fireEvent.change(dietaryRequirementsInput, {
      target: { value: "i3" }
    })

    expect(mockOnValidityChange).toHaveBeenCalledWith(true)
  })

  it("should call onValidityChange with false when either checkbox is unchecked", () => {
    const mockOnValidityChange = jest.fn()
    const { getByTestId } = render(
      <RequirementCheckBoxes onValidityChange={mockOnValidityChange} />
    )

    const nightPolicyCheckbox = getByTestId("agreed-to-night-policy-checkbox")
    const bookingPolicyCheckbox = getByTestId(
      "agreed-to-general-policy-checkbox"
    )

    const dietaryRequirementsInput = getByTestId("dietary-requirements-input")

    fireEvent.click(nightPolicyCheckbox)

    fireEvent.change(dietaryRequirementsInput, {
      target: { value: "ii" }
    })

    expect(mockOnValidityChange).toHaveBeenCalledWith(false)

    fireEvent.click(bookingPolicyCheckbox)

    expect(mockOnValidityChange).toHaveBeenCalledWith(true)
  })
})
