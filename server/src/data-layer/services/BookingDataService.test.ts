import { cleanFirestore } from "test-config/TestUtils"
import BookingDataService from "./BookingDataService"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"

describe("BookingDataService", () => {
  afterEach(async () => {
    await cleanFirestore()
  })

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
    await new BookingDataService().createBooking({
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

    const bookingsBy_BSID = await new BookingDataService().getBookingsBySlotId(
      "booking1"
    ) // test for booking_slot_id input

    expect(bookingsBy_BSID).not.toBe(undefined)
    expect(bookingsBy_BSID.length).toBe(1)
    expect(bookingsBy_BSID[0]).toEqual({
      user_id: "Person1",
      booking_slot_id: "booking1",
      stripe_payment_id: "stripeID1"
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
