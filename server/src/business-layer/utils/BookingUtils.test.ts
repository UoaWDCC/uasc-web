import { Timestamp } from "firebase-admin/firestore"
import BookingUtils, { _earliestDate, _latestDate } from "./BookingUtils"
import { LodgePricingTypeValues } from "./StripeProductMetadata"
import BookingDataService from "../../data-layer/services/BookingDataService"
import { cleanFirestore } from "../../test-config/TestUtils"
import { BookingSlot } from "../../data-layer/models/firebase"
import BookingSlotsService from "../../data-layer/services/BookingSlotsService"

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
      const _friday = new Date("2024-06-14")
      const _saturday = new Date("2024-06-15")

      const friday = Timestamp.fromDate(_friday)
      const saturday = Timestamp.fromDate(_saturday)

      expect(BookingUtils.getRequiredPricing([friday])).toBe(
        LodgePricingTypeValues.SingleFridayOrSaturday
      )
      expect(BookingUtils.getRequiredPricing([saturday])).toBe(
        LodgePricingTypeValues.SingleFridayOrSaturday
      )
    })

    it("should return Normal for other cases", () => {
      const _otherDay = new Date("2024-06-16")
      const _friday = new Date("2024-06-14")

      const otherDay = Timestamp.fromDate(_otherDay)
      const friday = Timestamp.fromDate(_friday)

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

  describe("isLastSpotTaken", () => {
    afterEach(async () => {
      await cleanFirestore()
    })

    it("should return true if the last spot is taken", async () => {
      // Create a booking slot with a maximum of 2 bookings
      const timestamp = Timestamp.fromDate(new Date(2024, 4, 23))
      const bookingSlotData: BookingSlot = {
        date: timestamp,
        description: "booking_slot_description",
        max_bookings: 2
      }
      const { id: slotId } = await new BookingSlotsService().createBookingSlot(
        bookingSlotData
      )

      // Create two bookings for the same slot
      await new BookingDataService().createBooking({
        user_id: "ronaldo",
        booking_slot_id: slotId,
        stripe_payment_id: "stripeID3"
      })

      await new BookingDataService().createBooking({
        user_id: "sui",
        booking_slot_id: slotId,
        stripe_payment_id: "stripeID1"
      })

      const result = await BookingUtils.isLastSpotTaken(slotId)

      expect(result).toBe(true)
    })

    it("should return false if spots are still available", async () => {
      // Create a booking slot with a maximum of 7 bookings
      const timestamp = Timestamp.fromDate(new Date(2024, 4, 23))
      const bookingSlotData: BookingSlot = {
        date: timestamp,
        description: "booking_slot_description",
        max_bookings: 7
      }
      const { id: slotId } = await new BookingSlotsService().createBookingSlot(
        bookingSlotData
      )

      // Create 1 booking for the slot
      await new BookingDataService().createBooking({
        user_id: "sdf",
        booking_slot_id: slotId,
        stripe_payment_id: "stripeID3"
      })

      const result = await BookingUtils.isLastSpotTaken(slotId)

      expect(result).toBe(false)
    })
  })
  describe("BookingUtils.addOneDay", () => {
    it("should add one day to a regular date", () => {
      expect(BookingUtils.addOneDay("01/08/2024")).toBe("02/08/2024")
    })

    it("should handle end of month", () => {
      expect(BookingUtils.addOneDay("31/07/2024")).toBe("01/08/2024")
    })

    it("should handle end of year", () => {
      expect(BookingUtils.addOneDay("31/12/2024")).toBe("01/01/2025")
    })

    it("should handle leap year", () => {
      expect(BookingUtils.addOneDay("28/02/2024")).toBe("29/02/2024")
      expect(BookingUtils.addOneDay("29/02/2024")).toBe("01/03/2024")
    })

    it("should handle non-leap year", () => {
      expect(BookingUtils.addOneDay("28/02/2023")).toBe("01/03/2023")
    })

    it("should handle single digit day and month", () => {
      expect(BookingUtils.addOneDay("01/01/2024")).toBe("02/01/2024")
      expect(BookingUtils.addOneDay("09/09/2024")).toBe("10/09/2024")
    })

    it("should handle invalid date format", () => {
      expect(() => BookingUtils.addOneDay("01-01-2024")).toThrow()
      expect(() => BookingUtils.addOneDay("invalid-date")).toThrow()
    })
  })
})
