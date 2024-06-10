import {
  AvailableDatesRequestModel,
  BookingsByDateRangeRequestModel
} from "service-layer/request-models/UserRequests"
import { AvailableDatesResponse } from "service-layer/response-models/PaymentResponse"
import { Timestamp } from "firebase-admin/firestore"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import { Controller, Post, Route, Security, SuccessResponse, Body } from "tsoa"
import { UserResponse } from "../response-models/UserResponse"
import { UsersByDateRangeResponse } from "../response-models/CommonResponse"
import UserDataService from "../../data-layer/services/UserDataService"
import * as console from "console"

@Route("bookings")
export class BookingController extends Controller {
  @SuccessResponse("200", "Availabilities found")
  @Security("jwt", ["member"])
  @Post("available-dates")
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
       *  So if there are 20 'booking data' documents referring to a booking slot
       *  - that means 20 bookings are reserved for a day
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

      if (requestBody.startDate) {
        startDate = requestBody.startDate
      }

      if (requestBody.endDate) {
        endDate = requestBody.endDate
      }

      // Query booking slots for all slots between the dates
      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )
      // console.log("found bookingslots: ", bookingSlots)

      const bookingSlotsToQuery = bookingSlots.map((bookingSlot) => {
        const { description, date, max_bookings, id } = bookingSlot
        return {
          id,
          description,
          date,
          maxBookings: max_bookings,
          availableSpaces: 0
        }
      })

      // Find the amount of bookings matching each of the booking slots
      const queryPromises = bookingSlotsToQuery.map(async (toQuery) => {
        const matchingBookings = await bookingDataService.getBookingsBySlotId(
          toQuery.id
        )
        const availableSpaces = toQuery.maxBookings - matchingBookings.length

        return {
          ...toQuery,
          availableSpaces: availableSpaces < 0 ? 0 : availableSpaces
        }
      })

      const responseData = await Promise.all(queryPromises)

      // Query stripe for the amount of active checkout sessions for each of the slots - IGNORE FOR NOW
      this.setStatus(200)
      return { data: responseData }
    } catch (e) {
      this.setStatus(500)
      return { error: "Something went wrong" }
    }
  }

  @SuccessResponse("200", "Users found")
  @Security("jwt", ["admin"])
  @Post("fetch-users")
  public async fetchUsersByBookingDateRange(
    @Body() requestBody: BookingsByDateRangeRequestModel
  ): Promise<UsersByDateRangeResponse> {
    try {
      const { startDate, endDate } = requestBody

      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()
      const userService = new UserDataService()

      // Query to get all booking slots within date range
      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )

      const responseData: Array<{ date: Timestamp; users: UserResponse[] }> = []

      for (const slot of bookingSlots) {
        const bookings = await bookingDataService.getBookingsBySlotId(slot.id)
        const userIds = bookings.map((booking) => booking.user_id)

        const users = await userService.getUsersByIds(userIds)
        console.log(userIds)
        // console.log(bookings)
        // console.log(users)
        responseData.push({
          date: slot.date,
          users
        })
      }

      this.setStatus(200)
      return { data: responseData }
    } catch (e) {
      this.setStatus(500)
      return { error: "Something went wrong" }
    }
  }
}
