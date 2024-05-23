import { cleanFirestore } from "test-config/TestUtils"
import BookingSlotsService from "./BookingSlotsService"
import { Timestamp } from "firebase-admin/firestore"
import { BookingSlot } from "data-layer/models/firebase"
import FirestoreCollections from "data-layer/adapters/FirestoreCollections"

const timestamp = Timestamp.fromDate(new Date(2024, 4, 23))
const timestamp2 = Timestamp.fromDate(new Date(2024, 4, 3))
const timestamp3 = Timestamp.fromDate(new Date(2024, 4, 10))
const timestamp4 = Timestamp.fromDate(new Date(2024, 4, 11))

const bookingSlotData: BookingSlot = {
  date: timestamp,
  description: "booking_slot_description",
  max_bookings: 0
}

const bookingSlotData2: BookingSlot = {
  date: timestamp2,
  description: "booking_slot_description2",
  max_bookings: 20
}

const bookingSlotData3: BookingSlot = {
  date: timestamp3,
  description: "booking_slot_description3",
  max_bookings: 10
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

    expect(data).toEqual({ ...bookingSlotData })
  })

  it("Should get booking slots based on stripe product id", async () => {
    await new BookingSlotsService().createBookingSlot(bookingSlotData)
    await new BookingSlotsService().createBookingSlot(bookingSlotData2)
    const bookingSlotsByStripeProductID =
      await new BookingSlotsService().getBookingSlotsStripeProductId(
        "product_id_value1"
      )

    expect(bookingSlotsByStripeProductID.length).toBe(2)
    expect(bookingSlotsByStripeProductID).toContainEqual({
      ...bookingSlotData
    })
    expect(bookingSlotsByStripeProductID).toContainEqual(bookingSlotData2)
  })

  it("Should get booking slots based on date", async () => {
    await new BookingSlotsService().createBookingSlot(bookingSlotData)
    const bookingSlotsByDate =
      await new BookingSlotsService().getBookingSlotByDate(timestamp)

    expect(bookingSlotsByDate).not.toBe(undefined)
    expect(bookingSlotsByDate.length).toBe(1)
    expect(bookingSlotsByDate[0]).toEqual(bookingSlotData)
  })

  it("Should get booking slots between date range", async () => {
    await new BookingSlotsService().createBookingSlot(bookingSlotData)
    await new BookingSlotsService().createBookingSlot(bookingSlotData2)
    await new BookingSlotsService().createBookingSlot(bookingSlotData3)
    const bookingSlotsBetweenDateRange =
      await new BookingSlotsService().getBookingSlotsBetweenDateRange(
        timestamp2,
        timestamp
      )

    expect(bookingSlotsBetweenDateRange.length).toBe(3)
    expect(bookingSlotsBetweenDateRange).toContainEqual(bookingSlotData)
    expect(bookingSlotsBetweenDateRange).toContainEqual(bookingSlotData2)
    expect(bookingSlotsBetweenDateRange).toContainEqual(bookingSlotData3)
  })

  it("Should get booking slots between valid date range", async () => {
    const { id } = await new BookingSlotsService().createBookingSlot(
      bookingSlotData
    )
    await new BookingSlotsService().updateBookingSlot(id, { date: timestamp4 })
    await new BookingSlotsService().createBookingSlot(bookingSlotData2)
    await new BookingSlotsService().createBookingSlot(bookingSlotData3)
    const bookingSlotsBetweenDateRange =
      await new BookingSlotsService().getBookingSlotsBetweenDateRange(
        timestamp2,
        timestamp3
      )

    expect(bookingSlotsBetweenDateRange.length).toBe(2)
    expect(bookingSlotsBetweenDateRange).toContainEqual(bookingSlotData2)
    expect(bookingSlotsBetweenDateRange).toContainEqual(bookingSlotData3)
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
