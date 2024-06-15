import { Timestamp } from "firebase/firestore"
import { BookingAvailability } from "models/Booking"
import fetchClient from "services/OpenApiFetchClient"

const BookingService = {
  getBookingAvailability: async function (
    startDate: Timestamp,
    endDate: Timestamp
  ): Promise<BookingAvailability[]> {
    const { data } = await fetchClient.POST("/bookings/available-dates", {
      body: {
        startDate,
        endDate
      }
    })
    if (!data || !data.data)
      throw new Error("Error getting booking availability")

    return data.data
  }
} as const

export default BookingService
