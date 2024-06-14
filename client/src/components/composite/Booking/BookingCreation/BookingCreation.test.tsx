import { fireEvent, render } from "@testing-library/react"
import {
  RequirementCheckBoxes,
  handleDateRangeInputChange
} from "./BookingCreation"

describe("handleDateRangeInputChange", () => {
  let setDateFunction: any
  let startDate
  let endDate

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

    fireEvent.click(nightPolicyCheckbox)
    fireEvent.click(bookingPolicyCheckbox)

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

    fireEvent.click(nightPolicyCheckbox)

    expect(mockOnValidityChange).toHaveBeenCalledWith(false)

    fireEvent.click(bookingPolicyCheckbox)

    expect(mockOnValidityChange).toHaveBeenCalledWith(true)
  })
})
