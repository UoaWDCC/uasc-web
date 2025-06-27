import type { Timestamp } from "firebase/firestore"
import type { BookingAvailability } from "@/models/Booking"
import fetchClient from "@/services/OpenApiFetchClient"

const BookingService = {
  getBookingAvailability: async (
    startDate: Timestamp,
    endDate: Timestamp
  ): Promise<BookingAvailability[]> => {
    const { data } = await fetchClient.POST("/bookings/available-dates", {
      body: {
        startDate,
        endDate
      }
    })
    if (!data || !data.data)
      throw new Error("Error getting booking availability")

    return data.data
  },
  getSelfBookings: async () => {
    const { data, response } = await fetchClient.GET("/bookings")

    if (!response.ok) {
      throw new Error("Failed to get bookings for current user")
    }

    return data
  }
} as const

export default BookingService
