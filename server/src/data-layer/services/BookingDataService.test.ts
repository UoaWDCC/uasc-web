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
      booking_slot_id: "asdds"
    })
    const doc = await FirestoreCollections.bookings.doc(id).get()
    const data = doc.data()

    expect(data).not.toBe(undefined)
    expect(data).toEqual({
      user_id: "asds",
      booking_slot_id: "asdds"
    })
  })
})
