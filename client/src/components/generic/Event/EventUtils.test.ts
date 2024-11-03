import { EventRenderingUtils } from "./EventUtils"

describe("dateTimeLocalPlaceHolder", () => {
  it("should format the date correctly in ISO 8601 format without milliseconds", () => {
    const date = new Date("2024-11-03T01:14:00Z")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-11-03T01:14")
  })

  it("should pad single digit months, days, hours, and minutes with leading zeros", () => {
    const date = new Date("2024-01-05T03:09:00Z")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-01-05T03:09")
  })

  it("should handle dates with double digit months, days, hours, and minutes correctly", () => {
    const date = new Date("2024-12-15T13:45:00Z")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-12-15T13:45")
  })

  it("should handle dates with different time zones correctly", () => {
    const date = new Date("2024-11-03T01:14:00+09:00")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-11-03T01:14")
  })
})
