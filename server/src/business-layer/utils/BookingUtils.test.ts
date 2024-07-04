import { Timestamp } from "firebase-admin/firestore"
import BookingUtils, { _earliestDate, _latestDate } from "./BookingUtils"

describe("BookingUtils", () => {
  describe("hasInvalidStartAndEndDates", () => {
    it("should return true when endDate is earlier than startDate", () => {
      const startDate = Timestamp.now()
      const endDate = Timestamp.fromDate(
        new Date(startDate.toDate().getTime() - 1000)
      )
      expect(BookingUtils.hasInvalidStartAndEndDates(startDate, endDate)).toBe(
        true
      )
    })

    it("should return true when startDate is earlier than earliestDate", () => {
      const startDate = Timestamp.fromDate(
        new Date(_earliestDate.getTime() - 1000)
      )
      const endDate = Timestamp.now()
      expect(BookingUtils.hasInvalidStartAndEndDates(startDate, endDate)).toBe(
        true
      )
    })

    it("should return true when endDate is later than latestDate", () => {
      const startDate = Timestamp.now()
      const endDate = Timestamp.fromDate(new Date(_latestDate.getTime() + 1000))
      expect(BookingUtils.hasInvalidStartAndEndDates(startDate, endDate)).toBe(
        true
      )
    })

    it("should return false when dates are within the acceptable range", () => {
      const startDate = Timestamp.now()
      const endDate = Timestamp.fromDate(
        new Date(startDate.toDate().getTime() + 1000)
      )
      expect(BookingUtils.hasInvalidStartAndEndDates(startDate, endDate)).toBe(
        false
      )
    })
  })

  describe("getSlotOccurences", () => {
    it("should return the correct slot occurrences", () => {
      const busySlotIds = ["A", "B", "A", "C", "B", "A"]

      const result = BookingUtils.getSlotOccurences(busySlotIds)

      expect(result.get("A")).toBe(3)
      expect(result.get("B")).toBe(2)
      expect(result.get("C")).toBe(1)
    })

    it("should handle an empty input array", () => {
      const result = BookingUtils.getSlotOccurences([])
      expect(result.size).toBe(0)
    })
  })
  describe("BookingUtils.fridayXorSaturday", () => {
    it("should return true if the dates contain only a Friday or only a Saturday", () => {
      const friday = Timestamp.fromDate(new Date("2024-07-05T00:00:00Z"))
      const saturday = Timestamp.fromDate(new Date("2024-07-06T00:00:00Z"))
      const sunday = Timestamp.fromDate(new Date("2024-07-07T00:00:00Z"))

      expect(BookingUtils.fridayXorSaturday([friday])).toBe(true)
      expect(BookingUtils.fridayXorSaturday([saturday])).toBe(true)
      expect(BookingUtils.fridayXorSaturday([friday, saturday])).toBe(false)
      expect(BookingUtils.fridayXorSaturday([friday, sunday])).toBe(true)
      expect(BookingUtils.fridayXorSaturday([saturday, sunday])).toBe(true)
      expect(BookingUtils.fridayXorSaturday([sunday])).toBe(false)
    })
  })
  describe("createLineItems", () => {
    test("should return an empty array when totalDays is 0", () => {
      const lineItems = BookingUtils.createBookingLineItems(
        false,
        0,
        "special",
        "normal"
      )
      expect(lineItems).toEqual([])
    })

    test("should add a normal price item when totalDays is greater than 1", () => {
      const lineItems = BookingUtils.createBookingLineItems(
        false,
        2,
        "special",
        "normal"
      )
      expect(lineItems).toContainEqual({ price: "normal", quantity: 2 })
    })

    test("should add a normal price item with quantity equal to totalDays when containsSpecialPrice is false", () => {
      const lineItems = BookingUtils.createBookingLineItems(
        false,
        2,
        "special",
        "normal"
      )
      expect(lineItems).not.toContainEqual({ price: "normal", quantity: 1 })
      expect(lineItems).toContainEqual({ price: "normal", quantity: 2 })
    })

    test("should not add a normal price item with quantity equal to totalDays when containsSpecialPrice is true", () => {
      const lineItems = BookingUtils.createBookingLineItems(
        true,
        2,
        "special",
        "normal"
      )
      expect(lineItems).toContainEqual({ price: "normal", quantity: 1 })
      expect(lineItems).toContainEqual({ price: "special", quantity: 1 })
    })
  })
})
