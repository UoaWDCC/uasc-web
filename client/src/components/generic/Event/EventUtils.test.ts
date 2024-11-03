import { EventRenderingUtils } from "./EventUtils"

describe("dateTimeLocalPlaceHolder", () => {
  it("should format the date correctly in ISO 8601 format without milliseconds", () => {
    const date = new Date(2024, 10, 3, 14, 30) // November 3, 2024, 14:30
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-11-03T14:30")
  })

  it("should pad single digit month, day, hours, and minutes with leading zeros", () => {
    const date = new Date(2024, 0, 5, 9, 7) // January 5, 2024, 09:07
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-01-05T09:07")
  })
})
