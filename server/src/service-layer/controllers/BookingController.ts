import {
  AvailableDatesRequestModel,
  BookingsByDateRangeRequestModel
} from "service-layer/request-models/UserRequests"
import { AvailableDatesResponse } from "service-layer/response-models/PaymentResponse"
import { Timestamp } from "firebase-admin/firestore"

import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import {
  AllUserBookingSlotsResponse,
  UIdssByDateRangeResponse
} from "service-layer/response-models/BookingResponse"
import { AllUserBookingsRequestBody } from "service-layer/request-models/BookingRequests"
import {
  Controller,
  Get,
  Post,
  Route,
  Security,
  SuccessResponse,
  Body,
  Request
} from "tsoa"
import { firestoreTimestampToDate } from "data-layer/adapters/DateUtils"
import { BookingIdandUserData, CombinedUserData } from "../response-models/UserResponse"
import { UsersByDateRangeResponse } from "../response-models/BookingResponse"
import UserDataService from "../../data-layer/services/UserDataService"
import * as console from "console"
import AuthService from "../../business-layer/services/AuthService"
import {
  AuthServiceClaims,
  UserAccountTypes
} from "../../business-layer/utils/AuthServiceClaims"

@Route("bookings")
export class BookingController extends Controller {
  @SuccessResponse("200", "Bookings successfully created")
  @Security("jwt", ["admin"])
  @Post("create-bookings")
  public async createBookings(
    @Body() requestBody: BookingsByDateRangeRequestModel
  ): Promise<UIdssByDateRangeResponse> {
    try {
      const { startDate, endDate } = requestBody

      /** Creating instances of the required services */
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      // Query to get all booking slots within date range
      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )

      /** The response data array */
      const responseData: Array<{
        date: Timestamp
        users: string[]
      }> = []

      /** Iterating through each booking slot */
      const bookingPromises = bookingSlots.map(async (slot) => {
        /** Getting the bookings for the current slot */
        const bookings = await bookingDataService.getBookingsBySlotId(slot.id)

        /** Extracting the all 3 Ids from the bookings */
        const userIds = bookings.map((booking) => booking.user_id)
        const slotIds = bookings.map((booking) => booking.booking_slot_id)
        const stripePaymentIds = bookings.map(
          (booking) => booking.stripe_payment_id
        )

        if (userIds.length === 0) {
          return
        }

        /** For every slotid add a booking for that id only if user doesn't already have a booking */
        const userIdsPromises = userIds.map(async (userId, i) => {
          if (
            (await bookingDataService.getBookingsByUserId(userIds[i]))
              .length !== 0
          ) {
            delete userIds[i] // Remove user from list if they already have a booking
          } else {
            await bookingDataService.createBooking({
              user_id: userIds[i],
              booking_slot_id: slotIds[i],
              stripe_payment_id: stripePaymentIds[i]
            })
          }
        })

        /** List of usersIds successfully added */
        responseData.push({
          date: slot.date,
          users: userIds
        })

        await Promise.all(userIdsPromises)
      })

      await Promise.all(bookingPromises)

      console.log(responseData)

      this.setStatus(200)

      /**
       * Returning the response data
       *
       * The filter is required to not include data that is null
       * because of the early return in the map
       */
      return { data: responseData.filter((data) => !!data) }
    } catch (e) {
      console.error("Error in getBookingsByDateRange:", e)
      this.setStatus(500)

      return { error: "Something went wrong" }
    }
  }

  @SuccessResponse("200", "Found bookings")
  @Security("jwt", ["member"])
  @Get()
  public async getAllBookings(
    @Request() request: AllUserBookingsRequestBody
  ): Promise<AllUserBookingSlotsResponse> {
    try {
      const bookingDates: AllUserBookingSlotsResponse = { dates: [] }
      if (request.user.uid) {
        const bookingDataService = new BookingDataService()
        const bookingSlotService = new BookingSlotService()

        const allBookingsData = await bookingDataService.getBookingsByUserId(
          request.user.uid
        )

        const bookingPromises = allBookingsData.map(async (booking) => {
          const bookingSlot = await bookingSlotService.getBookingSlotById(
            booking.booking_slot_id
          )
          if (bookingSlot) {
            bookingDates.dates.push(
              firestoreTimestampToDate(bookingSlot.date)
                .toISOString()
                .split("T")[0]
            )
          }
        })
        await Promise.all(bookingPromises)
      }
      return bookingDates
    } catch (e) {
      this.setStatus(500)
      return { error: "Failed to get bookings." }
    }
  }

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
      console.log("found bookingslots: ", bookingSlots)

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

  /**
   * This method fetches users based on a booking date range.
   */
  @SuccessResponse("200", "Users found")
  @Security("jwt", ["admin"])
  @Post("fetch-users")
  public async fetchUsersByBookingDateRange(
    @Body() requestBody: BookingsByDateRangeRequestModel
  ): Promise<UsersByDateRangeResponse> {
    try {
      const { startDate, endDate } = requestBody

      /** Creating instances of the required services */
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()
      const userService = new UserDataService()
      const authService = new AuthService()

      // Query to get all booking slots within date range
      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )

      /** The response data array */
      const responseData: Array<{
        date: Timestamp
        users: BookingIdandUserData[]
      }> = []

      /** Iterating through each booking slot */
      const bookingPromises = bookingSlots.map(async (slot) => {
        /** Getting the bookings for the current slot */
        const bookings = await bookingDataService.getBookingsBySlotId(slot.id)

        /** Extracting the user and booking slot IDs from the bookings */
        const userIds = bookings.map((booking) => booking.user_id)
        const bookingSlotIds = bookings.map((booking) => booking.booking_slot_id)

        if (userIds.length === 0) {
          return
        }

        /** Fetching the users based on the user IDs */
        const users = await userService.getUsersByIds(userIds)

        const authUsers = await authService.bulkRetrieveUsersByUids(
          userIds.map((uid) => ({ uid }))
        )

        const combinedUsers: CombinedUserData[] = users.map((user) => {
          const authUser = authUsers.find((auth) => auth.uid === user.uid)

          let membership: UserAccountTypes = UserAccountTypes.GUEST

          const customClaims = authUser?.customClaims

          if (customClaims) {
            if (customClaims[AuthServiceClaims.ADMIN]) {
              membership = UserAccountTypes.ADMIN
            } else if (customClaims[AuthServiceClaims.MEMBER]) {
              membership = UserAccountTypes.MEMBER
            }
          }

          return {
            ...user,
            email: authUser?.email,
            membership,
          } as CombinedUserData
        })

        /** Adding the date and users to the response data array */
        responseData.push({
          date: slot.date,
          // Mapping the users to include the booking ID
          users: combinedUsers.map((user, i) => ({
            ...user,
            bookingId: bookingSlotIds[i]
          }))
        })
      })

      await Promise.all(bookingPromises)

      console.log(responseData)

      this.setStatus(200)

      /**
       * Returning the response data
       *
       * The filter is required to not include data that is null
       * because of the early return in the map
       */
      return { data: responseData.filter((data) => !!data) }
    } catch (e) {
      console.error("Error in getBookingsByDateRange:", e)
      this.setStatus(500)

      return { error: "Something went wrong" }
    }
  }
}
