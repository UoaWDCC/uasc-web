import { AvailableDatesRequestModel } from "service-layer/request-models/UserRequests"
import { AvailableDatesResponse } from "service-layer/response-models/PaymentResponse"
import { Timestamp } from "firebase-admin/firestore"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import { Controller, Post, Route, Security, SuccessResponse, Body } from "tsoa"

@Route("bookings")
export class BookingController extends Controller {
  @SuccessResponse("200", "Availabilities found")
  @Security("jwt", ["member", "admin"])
  @Post("available_dates")
  public async getAvailableDates(
    @Body() requestBody: AvailableDatesRequestModel
  ): Promise<AvailableDatesResponse> {
    try {
      /**
       *
       *  Booking slot - describe for ONE DAY how many spots are available
       *
       *  Booking data - each one of these entries/documents represents a booking for a USER for ONE DAY
       *  Booking data - each one has a reference to a booking slot.
       *
       *  So if there are 20 'booking data' documents - that means 20 bookings are reserved for a day
       *
       */
      // Use this to check for the bookings on each of the dates between the start and end from the body
      const bookingSlotService = new BookingSlotService()
      // Use this to check for bookings matching booking slot ids
      const bookingDataService = new BookingDataService()

      let startDate = Timestamp.now()
      const _endDate = new Date()
      _endDate.setFullYear(_endDate.getFullYear() + 1)
      let endDate = Timestamp.fromDate(_endDate) as Timestamp

      if (!requestBody.startDate) {
        startDate = requestBody.startDate
      }

      if (!requestBody.endDate) {
        endDate = requestBody.endDate
      }

      // Query booking slots for all slots between the dates
      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )
      const bookingSlotsToQuery = bookingSlots.map((bookingSlot) => {
        const { stripe_product_id, description, date, max_bookings, id } =
          bookingSlot
        return {
          id,
          stripeProductId: stripe_product_id,
          description,
          date,
          maxBookings: max_bookings,
          availableSpaces: 0
        }
      })

      const responseData: AvailableDatesResponse["data"] = []

      // Find the amount of bookings matching each of the booking slots
      const queryPromises = bookingSlotsToQuery.map(async (toQuery) => {
        const matchingBookings =
          await bookingDataService.getBookingsByBookingSlotId(toQuery.id)
        responseData.push({
          ...toQuery,
          availableSpaces: toQuery.maxBookings - matchingBookings.length
        })
      })

      await Promise.all(queryPromises)

      // Query stripe for the amount of active checkout sessions for each of the slots - IGNORE FOR NOW

      return { data: responseData }
    } catch (e) {}
  }
}
