import { MS_IN_SECOND } from "utils/Constants"
import { DateUtils } from "./DateUtils"

describe("DateUtils", () => {
  describe("datesToDateRange", () => {
    it("should return an array of dates between start and end date", () => {
      const startDate = new Date("2024-01-01")
      const endDate = new Date("2024-01-03")
      const result = DateUtils.datesToDateRange(startDate, endDate)
      expect(result).toEqual([
        new Date("2024-01-01"),
        new Date("2024-01-02"),
        new Date("2024-01-03")
      ])
    })
  })

  describe("isSingleFridayOrSaturday", () => {
    it("should return true if the date range is a single Friday or Saturday", () => {
      const friday = new Date("2024-01-05")
      const saturday = new Date("2024-01-06")
      expect(DateUtils.isSingleFridayOrSaturday(friday, friday)).toBe(true)
      expect(DateUtils.isSingleFridayOrSaturday(saturday, saturday)).toBe(true)
    })

    it("should return false if the date range is not a single Friday or Saturday", () => {
      const thursday = new Date("2024-01-04")
      const sunday = new Date("2024-01-07")
      expect(DateUtils.isSingleFridayOrSaturday(thursday, thursday)).toBe(false)
      expect(DateUtils.isSingleFridayOrSaturday(sunday, sunday)).toBe(false)
    })
  })

  describe("dateEqualToTimestamp", () => {
    it("should return true if date and timestamp are equal", () => {
      const date = new Date("2024-01-01")
      const timestamp = { seconds: date.getTime() / MS_IN_SECOND }
      expect(DateUtils.dateEqualToTimestamp(date, timestamp)).toBe(true)
    })

    it("should return false if date and timestamp are not equal", () => {
      const date = new Date("2024-01-01")
      const timestamp = { seconds: date.getTime() / MS_IN_SECOND + 1 }
      expect(DateUtils.dateEqualToTimestamp(date, timestamp)).toBe(false)
    })
  })

  describe("timestampToDate", () => {
    it("should convert timestamp to date", () => {
      const timestamp = { seconds: 1704067200, nanoseconds: 0 } // 2024-01-01T00:00:00.000Z
      const date = new Date("2024-01-01")
      expect(DateUtils.timestampToDate(timestamp)).toEqual(date)
    })
  })

  describe("timestampMilliseconds", () => {
    it("should return seconds from timestamp", () => {
      const timestamp = { seconds: 1609459200 }
      expect(DateUtils.timestampMilliseconds(timestamp)).toBe(1609459200000)
    })

    it("should return _seconds from timestamp", () => {
      const timestamp = { _seconds: 1609459200 }
      expect(DateUtils.timestampMilliseconds(timestamp)).toBe(1609459200000)
    })
  })

  describe("convertLocalDateToUTCDate", () => {
    it("should convert local date to UTC date", () => {
      const localDate = new Date("2024-01-01T00:00:00")
      const utcDate = new Date(Date.UTC(2024, 0, 1))
      expect(DateUtils.convertLocalDateToUTCDate(localDate)).toEqual(utcDate)
    })
  })
})
