import { cleanFirestore } from "test-config/TestUtils"
import BookingDataService from "./BookingDataService"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import BookingSlotService from "./BookingSlotsService"
import { dateToFirestoreTimeStamp } from "data-layer/adapters/DateUtils"

describe("BookingDataService", () => {
  afterEach(async () => {
    await cleanFirestore()
  })
  describe("Basic Crud", () => {
    it("Should create a booking in firestore", async () => {
      const { id } = await new BookingDataService().createBooking({
        user_id: "asds",
        booking_slot_id: "asdds",
        stripe_payment_id: "stripe_payment_id_value"
      })
      const doc = await FirestoreCollections.bookings.doc(id).get()
      const data = doc.data()

      expect(data).not.toBe(undefined)
      expect(data).toEqual({
        user_id: "asds",
        booking_slot_id: "asdds",
        stripe_payment_id: "stripe_payment_id_value"
      })
    })

    it("Should get bookings based on specific id", async () => {
      const booking1 = await new BookingDataService().createBooking({
        user_id: "Person1",
        booking_slot_id: "booking1",
        stripe_payment_id: "stripeID1"
      })

      const bookingsBy_UID = await new BookingDataService().getBookingsByUserId(
        "Person1"
      ) // test for user_id input

      expect(bookingsBy_UID).not.toBe(undefined)
      expect(bookingsBy_UID.length).toBe(1)
      expect(bookingsBy_UID[0]).toEqual({
        user_id: "Person1",
        booking_slot_id: "booking1",
        stripe_payment_id: "stripeID1"
      })

      const bookingsBy_BSID =
        await new BookingDataService().getBookingsBySlotId("booking1") // test for booking_slot_id input

      expect(bookingsBy_BSID).not.toBe(undefined)
      expect(bookingsBy_BSID.length).toBe(1)
      expect(bookingsBy_BSID[0]).toEqual({
        user_id: "Person1",
        booking_slot_id: "booking1",
        stripe_payment_id: "stripeID1",
        id: booking1.id
      })

      const bookingsBy_SPID =
        await new BookingDataService().getBookingsByStripeSessionId("stripeID1") // test for stripe_payment_id input

      expect(bookingsBy_SPID).not.toBe(undefined)
      expect(bookingsBy_SPID).toEqual({
        user_id: "Person1",
        booking_slot_id: "booking1",
        stripe_payment_id: "stripeID1"
      })
    })

    it("Should update a booking in firestore", async () => {
      const { id } = await new BookingDataService().createBooking({
        user_id: "asds",
        booking_slot_id: "asdds",
        stripe_payment_id: "stripeID1"
      })
      await new BookingDataService().updateBooking(id, {
        user_id: "newUserID",
        booking_slot_id: "newBookingSlotID",
        stripe_payment_id: "stripeID2"
      })

      const doc = await FirestoreCollections.bookings.doc(id).get()
      const data = doc.data()

      expect(data).not.toBe(undefined)
      expect(data).toEqual({
        user_id: "newUserID",
        booking_slot_id: "newBookingSlotID",
        stripe_payment_id: "stripeID2"
      })
    })

    it("Should delete a booking from firestore", async () => {
      const { id } = await new BookingDataService().createBooking({
        user_id: "sdf",
        booking_slot_id: "sdff",
        stripe_payment_id: "stripeID3"
      })
      await new BookingDataService().deleteBooking(id)
      const doc = await FirestoreCollections.bookings.doc(id).get()

      expect(doc.exists).toBe(false)
    })
  })

  describe("Misc operations", () => {
    test("Validate bookings for user", async () => {
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      const MOCK_USER_ID = "asdjkds"

      const slotDate = new Date("10/09/2009")
      const slotTimestamp = dateToFirestoreTimeStamp(slotDate)
      const { id } = await bookingSlotService.createBookingSlot({
        max_bookings: 3,
        date: slotTimestamp
      })

      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          slotTimestamp,
          slotTimestamp
        )

      let result = await bookingDataService.getAvailabilityForUser(
        MOCK_USER_ID,
        [slotTimestamp],
        bookingSlots
      )

      // No users have booked yet
      expect(result).not.toContain(undefined)
      expect(result).toContainEqual({ id, baseAvailability: 3 })

      // Now simulate the user already having a booking
      await bookingDataService.createBooking({
        booking_slot_id: id,
        user_id: MOCK_USER_ID,
        stripe_payment_id: ""
      })

      result = await bookingDataService.getAvailabilityForUser(
        MOCK_USER_ID,
        [slotTimestamp],
        bookingSlots
      )

      expect(result).toContain(undefined)
    })
  })
})
