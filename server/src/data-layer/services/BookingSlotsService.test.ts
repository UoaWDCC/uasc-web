import { cleanFirestore } from "test-config/TestUtils"
import BookingSlotsService from "./BookingSlotsService"
import { Timestamp } from "firebase-admin/firestore"
import { BookingSlot } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"

const timestamp = Timestamp.now()
const bookingSlotData: BookingSlot = {
  date: timestamp,
  stripe_product_id: "product_id_value",
  description: "booking_slot_description",
  max_bookings: 0
}

describe("BookingSlotsService Tests", () => {
  afterEach(async () => {
    await cleanFirestore()
  })

  it("Should create a booking slot", async () => {
    const { id } = await new BookingSlotsService().createBookingSlot(
      bookingSlotData
    )
    const doc = await FirestoreCollections.bookingSlots.doc(id).get()
    const data = doc.data()

    expect(data).not.toBe(undefined)
    expect(data).toEqual({ ...bookingSlotData }) // not sure if this is correct
  })

  it("Should get booking slots based on stripe product id", async () => {
    await new BookingSlotsService().createBookingSlot(bookingSlotData)
    const bookingSlotsByStripeProductID =
      await new BookingSlotsService().getBookingSlotsStripeProductId(
        "product_id_value"
      )

    expect(bookingSlotsByStripeProductID).not.toBe(undefined)
    expect(bookingSlotsByStripeProductID[0]).toEqual({
      ...bookingSlotData // not sure if this is correct
    })
  })

  it("Should get booking slots based on date", async () => {
    await new BookingSlotsService().createBookingSlot(bookingSlotData)
    const bookingSlotsByDate =
      await new BookingSlotsService().getBookingSlotByDate(timestamp)

    expect(bookingSlotsByDate).not.toBe(undefined)
    expect(bookingSlotsByDate.length).toBe(1)
    expect(bookingSlotsByDate[0]).toEqual({
      ...bookingSlotData
    })
  })

  it("Should update booking slot", async () => {
    const { id } = await new BookingSlotsService().createBookingSlot(
      bookingSlotData
    )
    await new BookingSlotsService().updateBookingSlot(id, { max_bookings: 10 })
    const doc = await FirestoreCollections.bookingSlots.doc(id).get()
    const data = doc.data()

    expect(data).toEqual({
      ...bookingSlotData,
      max_bookings: 10
    })
  })

  it("Should delete booking slot", async () => {
    const { id } = await new BookingSlotsService().createBookingSlot(
      bookingSlotData
    )
    await new BookingSlotsService().deleteBookingSlot(id)
    const doc = await FirestoreCollections.bookingSlots.doc(id).get()

    expect(doc.exists).toBe(false)
  })
})
