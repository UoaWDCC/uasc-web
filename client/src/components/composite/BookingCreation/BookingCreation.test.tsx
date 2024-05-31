import { handleDateRangeInputChange } from "./BookingCreation"

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
