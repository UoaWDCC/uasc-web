import { cleanFirestore } from "test-config/TestUtils"
import BookingSlotsService from "./BookingSlotsService"
import { Timestamp } from "firebase-admin/firestore"
import { BookingSlot } from "data-layer/models/firebase"

const timestamp = Timestamp.now()
const TEST_SPID = "testStripeProductId"
const bookingSlotData: BookingSlot = {
  start_date: timestamp,
  end_date: timestamp,
  product_id: "product_id_value",
  active: true,
  display_price: 0,
  name: "booking_slot_name",
  description: "booking_slot_description",
  max_bookings: 0,
  remaining_spots: 0
}

describe("BookingSlotsService Tests", () => {
  let bookingSlotService: BookingSlotsService

  afterEach(async () => {
    await cleanFirestore()
  })

  beforeEach(() => {
    bookingSlotService = new BookingSlotsService()
  })

  it("Should create a booking slot", async () => {
    await bookingSlotService.createBookingSlot(bookingSlotData)
    const data = await bookingSlotService.getBookingStripeProductId(TEST_SPID)

    expect(data).not.toBe(undefined)
    expect(data).toEqual({ ...bookingSlotData, stripe_product_id: TEST_SPID })
  })

  it("Should get booking slots based on stripe product id", async () => {
    await bookingSlotService.createBookingSlot(bookingSlotData)
    const data = await bookingSlotService.getBookingStripeProductId(TEST_SPID)

    expect(data).not.toBe(undefined)
    expect(data.length).toBe(1)
    expect(data[0]).toEqual({
      ...bookingSlotData,
      stripe_product_id: TEST_SPID
    })
  })

  it("Should get booking slots based on date", async () => {
    await bookingSlotService.createBookingSlot(bookingSlotData)
    const data = await bookingSlotService.getBookingSlotByDate(timestamp)

    expect(data).not.toBe(undefined)
    expect(data.length).toBe(1)
    expect(data[0]).toEqual({
      ...bookingSlotData,
      stripe_product_id: TEST_SPID
    })
  })

  it("Should update booking slot", async () => {
    await bookingSlotService.createBookingSlot(bookingSlotData)
    await bookingSlotService.updateBookingSlot(TEST_SPID, { active: false })
    const data = await bookingSlotService.getBookingStripeProductId(TEST_SPID)

    expect(data).not.toBe(undefined)
    expect(data.length).toBe(1)
    expect(data[0]).toEqual({
      ...bookingSlotData,
      stripe_product_id: TEST_SPID,
      active: false
    })
  })

  it("Should delete booking slot", async () => {
    await bookingSlotService.createBookingSlot(bookingSlotData)
    await bookingSlotService.deleteBookingSlot(TEST_SPID)
    const data = await bookingSlotService.getBookingStripeProductId(TEST_SPID)

    expect(data).not.toEqual({
      ...bookingSlotData,
      stripe_product_id: TEST_SPID
    })
    expect(data.length).toBe(0)
  })
})
