import { EventRenderingUtils } from "./EventUtils"

describe("dateTimeLocalPlaceHolder", () => {
  it("should return a formatted string in ISO 8601 format without milliseconds", () => {
    const date = new Date("2024-11-01T23:34:15.123Z")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-11-01T23:34:15")
  })

  it("should handle dates without milliseconds correctly", () => {
    const date = new Date("2024-11-01T23:34:15Z")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-11-01T23:34:15")
  })

  it("should handle different time zones correctly", () => {
    const date = new Date("2024-11-01T23:34:15.123+09:00")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-11-01T14:34:15")
  })

  it("should handle leap years correctly", () => {
    const date = new Date("2024-02-29T23:34:15.123Z")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("2024-02-29T23:34:15")
  })

  it("should handle dates before 1970 correctly", () => {
    const date = new Date("1969-12-31T23:34:15.123Z")
    const result = EventRenderingUtils.dateTimeLocalPlaceHolder(date)
    expect(result).toBe("1969-12-31T23:34:15")
  })
})
