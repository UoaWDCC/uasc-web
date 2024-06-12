import { Timestamp } from "firebase-admin/firestore"
import BookingUtils, { _earliestDate, _latestDate } from "./BookingUtils"
import { LodgePricingTypeValues } from "./StripeProductMetadata"

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

    // Add more test cases as needed
  })
  describe("BookingUtils.getRequiredPricing", () => {
    it("should return SingleFridayOrSaturday for a single Friday or Saturday", () => {
      const friday = new Date("2024-06-14")
      const saturday = new Date("2024-06-15")

      expect(BookingUtils.getRequiredPricing([friday])).toBe(
        LodgePricingTypeValues.SingleFridayOrSaturday
      )
      expect(BookingUtils.getRequiredPricing([saturday])).toBe(
        LodgePricingTypeValues.SingleFridayOrSaturday
      )
    })

    it("should return Normal for other cases", () => {
      const otherDay = new Date("2024-06-16")
      const friday = new Date("2024-06-14")

      expect(BookingUtils.getRequiredPricing([otherDay])).toBe(
        LodgePricingTypeValues.Normal
      )
      expect(BookingUtils.getRequiredPricing([])).toBe(
        LodgePricingTypeValues.Normal
      )
      expect(BookingUtils.getRequiredPricing([friday, otherDay])).toBe(
        LodgePricingTypeValues.Normal
      )
    })
  })
})
