import AuthService from "business-layer/services/AuthService"
import {
  DEFAULT_BOOKING_MAX_SLOTS,
  EMPTY_BOOKING_SLOTS
} from "business-layer/utils/BookingConstants"
import {
  UTCDateToDdMmYyyy,
  firestoreTimestampToDate,
  timestampsInRange
} from "data-layer/adapters/DateUtils"
import type { UserAdditionalInfo, Event } from "data-layer/models/firebase"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import UserDataService from "data-layer/services/UserDataService"
import type {
  DeleteBookingRequest,
  AddCouponRequestBody,
  MakeDatesAvailableRequestBody,
  FetchLatestBookingEventRequest
} from "service-layer/request-models/AdminRequests"
import type {
  CreateBookingsRequestModel,
  CreateUserRequestBody,
  DemoteUserRequestBody,
  EditUsersRequestBody,
  PromoteUserRequestBody
} from "service-layer/request-models/UserRequests"
import type {
  UIdssByDateRangeResponse,
  BookingDeleteResponse,
  BookingSlotUpdateResponse
} from "service-layer/response-models/BookingResponse"
import type {
  AllUsersResponse,
  GetUserResponse
} from "service-layer/response-models/UserResponse"
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  SuccessResponse
} from "tsoa"
import * as console from "console"
import StripeService from "../../business-layer/services/StripeService"
import type { UserAccountTypes } from "../../business-layer/utils/AuthServiceClaims"
import type { UserRecord } from "firebase-admin/auth"
import { Timestamp } from "firebase-admin/firestore"
import MailService from "business-layer/services/MailService"
import BookingUtils, {
  CHECK_IN_TIME,
  CHECK_OUT_TIME
} from "business-layer/utils/BookingUtils"
import BookingHistoryService from "data-layer/services/BookingHistoryService"
import type {
  FetchLatestBookingHistoryEventResponse,
  GetEventResponse
} from "service-layer/response-models/AdminResponse"
import type { CreateEventBody } from "service-layer/request-models/EventRequests"
import EventService from "data-layer/services/EventService"
import { RedirectKeys } from "../../business-layer/utils/RedirectKeys"
import type {
  UpdateEmailTemplateRequestBody,
  UpdateMailConfigRequestBody
} from "service-layer/request-models/MailConfigRequests"
import type {
  GetAllEmailTemplatesResponse,
  GetEmailTemplateResponse,
  GetMailConfigResponse,
  UpdateEmailTemplateResponse,
  UpdateMailConfigResponse
} from "service-layer/response-models/MailConfigResponse"
import MailConfigService from "data-layer/services/MailConfigService"

import { compile as pugCompile } from "pug"
import * as process from "node:process"
import { EncryptionService } from "../../business-layer/services/EncryptionService"
import { getReasonPhrase, StatusCodes } from "http-status-codes"

@Route("admin")
@Security("jwt", ["admin"])
export class AdminController extends Controller {
  /**
   * Booking Operations
   */

  /**
   * Increases availability count for bookings slots in a date range.
   * @param requestBody - The start and end date of the range and the number of slots to add.
   * @returns An updated list of booking timestamps and their corresponding booking slot IDs.
   */
  @SuccessResponse("201", "Slot made available")
  @Post("/bookings/make-dates-available")
  public async makeDateAvailable(
    @Body() requestBody: MakeDatesAvailableRequestBody
  ): Promise<BookingSlotUpdateResponse> {
    const { startDate, endDate, slots } = requestBody
    const bookingSlotService = new BookingSlotService()

    const dateTimestamps = timestampsInRange(startDate, endDate)

    const datesToUpdatePromises = dateTimestamps.map(async (dateTimestamp) => {
      try {
        const [bookingSlotForDate] =
          await bookingSlotService.getBookingSlotByDate(dateTimestamp)

        if (!bookingSlotForDate) {
          const bookingSlot = await bookingSlotService.createBookingSlot({
            date: dateTimestamp,
            max_bookings: slots || DEFAULT_BOOKING_MAX_SLOTS
          })
          return { bookingSlotId: bookingSlot.id, date: dateTimestamp }
        }

        // Was unavailable
        await bookingSlotService.updateBookingSlot(bookingSlotForDate.id, {
          max_bookings: slots || DEFAULT_BOOKING_MAX_SLOTS
        })

        return { bookingSlotId: bookingSlotForDate.id, date: dateTimestamp }
      } catch (e) {
        console.error(
          `Something went wrong when trying to make the date
          ${firestoreTimestampToDate(dateTimestamp).toString()} available`
        )
        return undefined
      }
    })

    try {
      const bookingSlotIds = await Promise.all(datesToUpdatePromises)

      /**
       * Log that there was a positive change in availability for a date range
       */
      await new BookingHistoryService().addAvailibilityChangeEvent({
        timestamp: Timestamp.now(),
        start_date: startDate,
        end_date: endDate,
        event_type: "changed_date_availability",
        change: slots || DEFAULT_BOOKING_MAX_SLOTS
      })

      this.setStatus(StatusCodes.CREATED)
      return { updatedBookingSlots: bookingSlotIds }
    } catch (e) {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      console.error(`An error occurred when making dates available: ${e}`)
      return { error: "Something went wrong when making dates available" }
    }
  }

  /**
   * Decreases availability count to 0 for all booking slots in a date range.
   * @param requestBody - The start and end date of the range, the number of slots is omitted as we're decreases all slots to 0.
   * @returns An updated list of booking timestamps and their corresponding booking slot IDs.
   */
  @SuccessResponse("201", "Slot made unavailable")
  @Post("/bookings/make-dates-unavailable")
  public async makeDateUnavailable(
    @Body() requestBody: Omit<MakeDatesAvailableRequestBody, "slots">
  ): Promise<BookingSlotUpdateResponse> {
    const { startDate, endDate } = requestBody
    const bookingSlotService = new BookingSlotService()

    const dateTimestamps = timestampsInRange(startDate, endDate)
    let change = 0
    const datesToUpdatePromises = dateTimestamps.map(async (dateTimestamp) => {
      try {
        const [bookingSlotForDate] =
          await bookingSlotService.getBookingSlotByDate(dateTimestamp)

        if (!bookingSlotForDate) {
          // don't care if it doesn't exist
          return undefined
        }

        // Was available
        if (bookingSlotForDate.max_bookings > EMPTY_BOOKING_SLOTS) {
          // TODO: change to proper functionality (i.e not completely make it empty)
          change = EMPTY_BOOKING_SLOTS - bookingSlotForDate.max_bookings
          await bookingSlotService.updateBookingSlot(bookingSlotForDate.id, {
            max_bookings: EMPTY_BOOKING_SLOTS
          })
        }

        return { bookingSlotId: bookingSlotForDate.id, date: dateTimestamp }
      } catch (e) {
        console.error(
          `Something went wrong when trying to make the date
          ${firestoreTimestampToDate(dateTimestamp).toString()} available`
        )
        return undefined
      }
    })

    try {
      const bookingSlotIds = await Promise.all(datesToUpdatePromises)

      /**
       * Log the dates being made unavailable
       */
      await new BookingHistoryService().addAvailibilityChangeEvent({
        timestamp: Timestamp.now(),
        start_date: startDate,
        end_date: endDate,
        event_type: "changed_date_availability",
        change
      })

      this.setStatus(StatusCodes.CREATED)
      return {
        updatedBookingSlots: bookingSlotIds.filter((id) => !!id) // No way to "skip" with map
      }
    } catch (e) {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      console.error(`An error occurred when making dates unavailable: ${e}`)
      return { error: "Something went wrong when making dates unavailable" }
    }
  }

  /**
   * An admin method to create bookings for a list of users within a date range.
   * @param requestBody - The date range and list of user ids to create bookings for.
   * @returns A list of users and timestamps that were successfully added to the booking slots.
   */
  @SuccessResponse("200", "Bookings successfully created")
  @Post("/bookings/create")
  public async createBookings(
    @Body() requestBody: CreateBookingsRequestModel
  ): Promise<UIdssByDateRangeResponse> {
    try {
      const { startDate, endDate, userId } = requestBody

      const responseData: Array<{
        date: Timestamp
        users: string[]
      }> = []

      /** Creating instances of the required services */
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      // Query to get all booking slots within date range
      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )

      /** Iterating through each booking slot */
      const bookingPromises = bookingSlots.map(async (slot) => {
        /** For every slotid add a booking for that id only if user doesn't already have a booking */
        const existingBooking =
          await bookingDataService.getBookingsByUserId(userId)
        if (
          !existingBooking.some(
            (booking) => booking.booking_slot_id === slot.id
          )
        ) {
          await bookingDataService.createBooking({
            user_id: userId,
            booking_slot_id: slot.id,
            stripe_payment_id: "manual_entry"
          })
        }
        responseData.push({
          date: slot.date,
          users: [userId]
        })
      })

      await Promise.all(bookingPromises)

      /**
       * Log that the user has been added to the date range
       */
      await new BookingHistoryService().addBookingAddedEvent({
        timestamp: Timestamp.now(),
        start_date: startDate,
        end_date: endDate,
        event_type: "added_user_to_booking",
        uid: userId
      })

      this.setStatus(StatusCodes.OK)
      /**
       * Send confirmation using MailService so that admins do not need to manually
       * followup on manual bookings.
       */
      const mailService = new MailService()

      try {
        const { first_name, last_name } =
          await new UserDataService().getUserData(userId)
        const [userAuthData] = await new AuthService().bulkRetrieveUsersByUids([
          { uid: userId }
        ])
        /**
         * Used for formatted display to user
         */
        const BOOKING_START_DATE = UTCDateToDdMmYyyy(
          new Date(firestoreTimestampToDate(startDate))
        )
        const BOOKING_END_DATE = UTCDateToDdMmYyyy(
          new Date(firestoreTimestampToDate(endDate))
        )
        mailService.sendBookingConfirmationEmail(
          userAuthData.email,
          `${first_name} ${last_name}`,
          `${BOOKING_START_DATE} ${CHECK_IN_TIME} (check in)`,
          `${BookingUtils.addOneDay(BOOKING_END_DATE)} ${CHECK_OUT_TIME} (check out)`
        )
      } catch (e) {
        console.error(
          `Was unable to send a confirmation email for manual booking`
        )
        return {
          data: responseData.filter((data) => !!data),
          error: `Was unable to send a confirmation email for manual booking`
        }
      }

      /**
       * Returning the response data
       *
       * The filter is required to not include data that is null
       * because of the early return in the map
       */
      return { data: responseData.filter((data) => !!data) }
    } catch (e) {
      console.error("Error in getBookingsByDateRange:", e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)

      return { error: "Something went wrong" }
    }
  }

  /**
   * Delete a users booking by booking ID.
   * @param requestBody - The booking ID to delete.
   * @returns The user ID of the user who made the booking.
   */
  @SuccessResponse("200", "Booking deleted successfuly")
  // TODO: Refactor this to be a DELETE request
  @Post("/bookings/delete")
  public async removeBooking(
    @Body() requestBody: DeleteBookingRequest
  ): Promise<BookingDeleteResponse> {
    const { bookingID } = requestBody
    // Validate and check if the booking actually exists
    const bookingDataService = new BookingDataService()
    let user_id
    let booking_slot_id
    try {
      const booking = await bookingDataService.getBookingById(bookingID)
      user_id = booking.user_id
      booking_slot_id = booking.booking_slot_id
    } catch (err) {
      this.setStatus(StatusCodes.NOT_FOUND)
      return { message: "Booking not found with that booking ID." }
    }
    // attempt to delete
    await bookingDataService.deleteBooking(bookingID)

    const { date } = await new BookingSlotService().getBookingSlotById(
      booking_slot_id
    )

    /**
     * Log that a user was removed from an booking for a date
     */
    await new BookingHistoryService().addBookingDeletedEvent({
      timestamp: Timestamp.now(),
      uid: user_id,
      start_date: date,
      end_date: date,
      event_type: "removed_user_from_booking"
    })

    return { user_id }
  }

  /**
   *  User Operations
   */

  /**
   * Get all users in the system.
   * Requires an admin JWT token.
   * @param cursor - The cursor to start fetching users from. Essentially a pagination token.
   * @param toFetch - The number of users to fetch. Defaults to 100. Is also a maximum of 100 users per fetch
   * @returns The list of users that were fetched.
   */
  @SuccessResponse("200", "Users found")
  @Security("jwt", ["admin"])
  @Get("/users")
  public async getAllUsers(
    @Query() cursor?: string,
    @Query() toFetch?: number
  ): Promise<AllUsersResponse> {
    // validation
    if (toFetch > 100 || toFetch < 0) {
      this.setStatus(StatusCodes.BAD_REQUEST)
      return { error: "Invalid fetch amount" }
    }
    const USERS_TO_FETCH = toFetch || 100
    try {
      const userDataService = new UserDataService()

      let snapshot
      if (cursor) {
        snapshot = await userDataService.getUserDocumentSnapshot(cursor)
      }

      const { users: rawUserData, nextCursor: lastUid } =
        await userDataService.getAllUserData(toFetch, snapshot)

      const uidsToQuery = rawUserData.map((data) => {
        return { uid: data.uid }
      })

      const authService = new AuthService()
      const userAuthData =
        await authService.bulkRetrieveUsersByUids(uidsToQuery)

      const combinedUserData = rawUserData.map((userInfo) => {
        const matchingUserRecord = userAuthData.find(
          (item) => item.uid === userInfo.uid
        )

        const { customClaims, email, metadata } = { ...matchingUserRecord } // to avoid undefined destructuring error

        const membership: UserAccountTypes =
          authService.getMembershipType(customClaims)

        return {
          email,
          membership,
          dateJoined: metadata ? metadata.creationTime : undefined,
          ...userInfo
        }
      })

      // If there is explicitly no more users we return an `undefined` next cursor
      let nextCursor
      if (combinedUserData.length === USERS_TO_FETCH) {
        nextCursor = lastUid
      }

      this.setStatus(StatusCodes.OK)

      return { data: combinedUserData, nextCursor }
    } catch (e) {
      console.error("Failed to fetch all users", e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return { error: "Something went wrong when fetching all users" }
    }
  }

  /**
   * Get a user by their UID.
   * Requires an admin JWT token.
   * @param uid - The UID of the user to fetch.
   * @returns The user data of the user with the given UID.
   */
  @SuccessResponse("200", "User found")
  @Get("/users/{uid}")
  public async getUser(@Path() uid: string): Promise<GetUserResponse> {
    try {
      const userService = new UserDataService()
      const user = await userService.getUserData(uid)

      if (!user) {
        this.setStatus(StatusCodes.NOT_FOUND)
        return { error: "User not found" }
      }

      const authService = new AuthService()
      const userAuthData = await authService.retrieveUserByUid(uid)
      const { customClaims, email, metadata } = { ...userAuthData }
      const membership: UserAccountTypes =
        authService.getMembershipType(customClaims)
      this.setStatus(StatusCodes.OK)
      return {
        data: {
          email,
          membership,
          dateJoined: metadata ? metadata.creationTime : undefined,
          ...user
        }
      }
    } catch (e) {
      console.error("Failed to fetch user data", e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return { error: "Something went wrong when fetching user data" }
    }
  }

  /**
   * Adds a new user to the database with their UID and user data.
   * Requires an admin JWT token.
   * @param requestBody - The user data to create and their UID.
   * @returns void.
   */
  @SuccessResponse("200", "Created")
  @Put("/users/create")
  public async createUser(
    @Body() requestBody: CreateUserRequestBody
  ): Promise<void> {
    const { uid, user } = requestBody
    if (await new UserDataService().userDataExists(uid)) {
      this.setStatus(StatusCodes.CONFLICT)
      return
    }
    await new UserDataService().createUserData(uid, user)
    this.setStatus(StatusCodes.OK)
  }

  /**
   * Edits a list of users with updated user additional info.
   * Requires an admin JWT token.
   * @param requestBody - The list of users to edit and their updated information.
   * @returns void.
   */
  @SuccessResponse("200", "Edited")
  @Patch("/users/bulk-edit")
  public async editUsers(
    @Body() requestBody: EditUsersRequestBody
  ): Promise<void> {
    const userService = new UserDataService()
    const users = requestBody.users
    const editPromises = users.map((user) => {
      const { uid, updatedInformation } = user
      return userService.editUserData(uid, updatedInformation)
    })
    await Promise.all(editPromises)
    this.setStatus(StatusCodes.OK)
  }

  /**
   * Promotes a user to a member. This returns a conflict when the user is already a member.
   * Requires an admin JWT token.
   * @param requestBody - The UID of the user to promote.
   * @returns void.
   */
  @SuccessResponse("200", "Promoted user")
  @Put("/users/promote")
  // set user membership to "member"
  public async promoteUser(
    @Body() requestBody: PromoteUserRequestBody
  ): Promise<void> {
    const userService = new UserDataService() // create a new data service
    const authService = new AuthService()
    // attempt to fetch user
    const user: UserAdditionalInfo = await userService.getUserData(
      requestBody.uid
    )
    if (!user) return this.setStatus(StatusCodes.BAD_REQUEST) // bad request
    const userClaimRole = await authService.getCustomerUserClaim(
      requestBody.uid
    )
    if (userClaimRole?.admin) return this.setStatus(StatusCodes.FORBIDDEN) // admin forbidden
    if (userClaimRole?.member) return this.setStatus(StatusCodes.CONFLICT) // conflict
    try {
      // update user claims in AuthService
      await authService.setCustomUserClaim(requestBody.uid, "member")
      this.setStatus(StatusCodes.OK)
    } catch (e) {
      console.error(e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR) // unknown server error?
    }
  }

  /**
   * Demotes a member to a guest. This returns a conflict when the user is already a guest.
   * Requires an admin JWT token.
   * @param requestBody - The UID of the user to demote.
   * @returns void.
   */
  @SuccessResponse("200", "Demoted user")
  @Put("/users/demote")
  // set user membership type to `undefined`
  public async demoteUser(
    @Body() requestBody: DemoteUserRequestBody
  ): Promise<void> {
    const userService = new UserDataService()
    const authService = new AuthService()
    const user: UserAdditionalInfo = await userService.getUserData(
      requestBody.uid
    )
    if (!user) return this.setStatus(StatusCodes.BAD_REQUEST) // bad request
    const userClaimRole = await authService.getCustomerUserClaim(
      requestBody.uid
    )
    if (userClaimRole?.admin) return this.setStatus(StatusCodes.FORBIDDEN) // admin forbidden
    if (!userClaimRole?.member) return this.setStatus(StatusCodes.CONFLICT) // conflict
    try {
      // update user claims in AuthService, set to null to delete the claim
      await authService.setCustomUserClaim(requestBody.uid, null)
      this.setStatus(StatusCodes.OK)
    } catch (e) {
      console.error(e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR) // unknown server error?
    }
  }

  /**
   * Demotes all non-admin users to guests. This is used to purge all membership statuses at the end of a billing cycle.
   * Requires an admin JWT token.
   * @returns void.
   */
  @SuccessResponse("200", "Demoted all non-admin users")
  @Patch("/users/demote-all")
  public async demoteAllUsers(): Promise<void> {
    try {
      const authService = new AuthService()
      let allUsers: UserRecord[] = await authService.getAllUsers()
      allUsers = allUsers.filter(
        (user) => !user.customClaims?.admin && user.customClaims?.member
      )

      const MAX_USERS_IN_BATCH = 3 as const

      // Batching solution adapted from https://stackoverflow.com/a/58686835
      while (allUsers.length) {
        await Promise.all(
          allUsers
            .splice(0, MAX_USERS_IN_BATCH - 1)
            .map((user) => authService.setCustomUserClaim(user.uid, null))
        )
      }

      this.setStatus(StatusCodes.OK)
    } catch (e) {
      console.error(e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Adds a coupon to a user's stripe id.
   * Requires an admin JWT token.
   * @param requestBody - The UID of the user to add the coupon to and the quantity of coupons to add.
   * @returns void.
   */
  @SuccessResponse("200", "Coupon Added")
  @Post("users/add-coupon")
  public async addCoupon(
    @Body() requestBody: AddCouponRequestBody
  ): Promise<void> {
    const { uid, quantity } = requestBody
    const amount = 40 // Hardcoded amount
    try {
      const userService = new UserDataService()
      const stripeService = new StripeService()
      const user = await userService.getUserData(uid)

      if (!user) {
        this.setStatus(StatusCodes.NOT_FOUND)
        return
      }
      if (!user.stripe_id) {
        this.setStatus(StatusCodes.BAD_REQUEST)
        return
      }

      // Add coupon to the user using Stripe ID
      const couponPromises = Array.from(
        { length: quantity },
        async () => await stripeService.addCouponToUser(user.stripe_id, amount)
      )
      await Promise.all(couponPromises)

      this.setStatus(StatusCodes.OK)
    } catch (e) {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Fetches the **latest** booking history events (uses cursor-based pagination)
   *
   * @param limit The maximum number of history events to fetch
   * @param cursor Optional starting point for pagination
   * @returns The list of latest history events
   */
  @SuccessResponse("200", "History Events Fetched")
  @Get("bookings/history")
  public async getLatestHistory(
    @Query() limit: FetchLatestBookingEventRequest["limit"],
    @Query() cursor?: FetchLatestBookingEventRequest["cursor"]
  ): Promise<FetchLatestBookingHistoryEventResponse> {
    try {
      const bookingHistoryService = new BookingHistoryService()

      let snapshot
      if (cursor) {
        snapshot =
          await bookingHistoryService.getBookingHistoryEventSnapshot(cursor)
      }

      const { data, nextCursor } = await bookingHistoryService.getLatestHistory(
        limit,
        snapshot
      )

      this.setStatus(StatusCodes.OK)
      return {
        historyEvents: data,
        nextCursor
      }
    } catch (e) {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      console.error("Failed to fetch the latest booking history", e)
      return {
        error: "Unable to fetch the booking history"
      }
    }
  }

  /**
   * Endpoint for admin to create a new event
   */
  @SuccessResponse("201", "Created Event")
  @Post("events")
  public async createNewEvent(@Body() body: CreateEventBody) {
    try {
      const eventService = new EventService()
      await eventService.createEvent({
        ...body.data,
        // Optional field
        ...(body.data.sign_up_start_date && {
          sign_up_start_date: new Timestamp(
            body.data.sign_up_start_date.seconds,
            body.data.sign_up_start_date.nanoseconds
          )
        }),
        // Optional field
        ...(body.data.sign_up_end_date && {
          sign_up_end_date: new Timestamp(
            body.data.sign_up_end_date.seconds,
            body.data.sign_up_end_date.nanoseconds
          )
        }),
        physical_start_date: new Timestamp(
          body.data.physical_start_date.seconds,
          body.data.physical_start_date.nanoseconds
        ),
        // Optional Field
        ...(body.data.physical_end_date && {
          physical_end_date: new Timestamp(
            body.data.physical_end_date.seconds,
            body.data.physical_end_date.nanoseconds
          )
        })
      })
      this.setStatus(StatusCodes.CREATED)
    } catch (e) {
      console.error(e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Endpoint for admints to edit an event.
   */
  @SuccessResponse("200", "Successfully edited the event!")
  @Patch("events/{id}")
  public async editEvent(
    @Path() id: string,
    @Body() requestBody: Partial<Event>
  ) {
    const eventService = new EventService()
    const fetchedEvent = await eventService.getEventById(id)
    if (!fetchedEvent) {
      this.setStatus(StatusCodes.NOT_FOUND)
    }
    try {
      const {
        sign_up_start_date,
        sign_up_end_date,
        physical_start_date,
        physical_end_date
      } = requestBody
      eventService.updateEvent(id, {
        ...requestBody,
        ...(sign_up_start_date && {
          sign_up_start_date: new Timestamp(
            sign_up_start_date.seconds,
            sign_up_start_date.nanoseconds
          )
        }),
        ...(sign_up_end_date && {
          sign_up_end_date: new Timestamp(
            sign_up_end_date.seconds,
            sign_up_end_date.nanoseconds
          )
        }),
        ...(physical_start_date && {
          physical_start_date: new Timestamp(
            physical_start_date.seconds,
            physical_start_date.nanoseconds
          )
        }),
        ...(physical_end_date && {
          physical_end_date: new Timestamp(
            physical_end_date.seconds,
            physical_end_date.nanoseconds
          )
        })
      })
    } catch (e) {
      console.error(e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
    this.setStatus(StatusCodes.OK)
  }

  @SuccessResponse("204", "Deleted single event")
  @Delete("events/{id}")
  public async deleteEvent(@Path() id: string) {
    try {
      const eventService = new EventService()
      await eventService.deleteEvent(id)
      this.setStatus(StatusCodes.NO_CONTENT)
    } catch {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  @SuccessResponse("200", "Successfully fetched the event")
  @Get("events/{id}")
  public async getEventById(@Path() id: string): Promise<GetEventResponse> {
    try {
      const eventService = new EventService()
      const event = await eventService.getEventById(id)

      if (!event) {
        this.setStatus(StatusCodes.NOT_FOUND)
        return { error: "Event not found." }
      }

      return { data: event }
    } catch (e) {
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        error: "Something went wrong when fetching the event, please try again"
      }
    }
  }

  /**
   * Returns a URL specified in environment variables
   * @param redirectKey - Key to look up in environment variables for the URL
   * @returns The URL from environment variables or an error
   */
  @SuccessResponse("200", "Successfully retrieved URL")
  @Get("redirect/{redirectKey}")
  public async getEnvUrl(
    @Path() redirectKey: string
  ): Promise<{ url?: string; error?: string }> {
    try {
      const parsedRedirectKey = redirectKey.trim().toUpperCase()
      const url = process.env[`REDIRECT_${parsedRedirectKey}`]

      if (
        !url ||
        !Object.values(RedirectKeys).includes(parsedRedirectKey as RedirectKeys)
      ) {
        this.setStatus(StatusCodes.NOT_FOUND)
        return { error: "URL not found" }
      }

      this.setStatus(StatusCodes.OK)
      return { url }
    } catch (e) {
      console.error(`Error retrieving URL for key ${redirectKey}:`, e)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return { error: "An error occurred while retrieving the URL" }
    }
  }

  /**
   * Mail Configuration Operations
   */

  /**
   * Get the current mail configuration
   * @returns The current mail configuration or undefined if not set
   */
  @SuccessResponse("200", "Mail configuration retrieved")
  @Get("/mail/config")
  public async getMailConfig(): Promise<GetMailConfigResponse> {
    try {
      const mailConfigService = new MailConfigService(
        new EncryptionService(process.env.MAIL_ENCRYPTION_KEY)
      )
      const config = await mailConfigService.getMailConfig()

      this.setStatus(StatusCodes.OK)
      return { config }
    } catch (error) {
      console.error("Error getting mail configuration:", error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message: "Failed to retrieve mail configuration"
      }
    }
  }

  /**
   * Update the mail configuration
   * @param requestBody The updated mail configuration
   * @returns Success status and any error message
   */
  @SuccessResponse("200", "Mail configuration updated")
  @Put("/mail/config")
  public async updateMailConfig(
    @Body() requestBody: UpdateMailConfigRequestBody
  ): Promise<UpdateMailConfigResponse> {
    try {
      const mailConfigService = new MailConfigService(
        new EncryptionService(process.env.MAIL_ENCRYPTION_KEY)
      )

      await mailConfigService.updateMailConfig(requestBody.config)

      this.setStatus(StatusCodes.OK)
      return { message: "Mail configuration updated successfully" }
    } catch (error) {
      console.error("Error updating mail configuration:", error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message: "Failed to update mail configuration"
      }
    }
  }

  /**
   * Get all available email templates
   * @returns List of email templates
   */
  @SuccessResponse("200", "Email templates retrieved")
  @Get("/mail/templates")
  public async getAllEmailTemplates(): Promise<GetAllEmailTemplatesResponse> {
    try {
      const mailConfigService = new MailConfigService(
        new EncryptionService(process.env.MAIL_ENCRYPTION_KEY)
      )
      const templates = await mailConfigService.getAllEmailTemplates()

      this.setStatus(StatusCodes.OK)
      return { templates }
    } catch (error) {
      console.error("Error getting email templates:", error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        templates: [],
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message: "Failed to retrieve email templates"
      }
    }
  }

  /**
   * Get a specific email template by ID
   * @param id The template ID
   * @returns The email template or an error
   */
  @SuccessResponse("200", "Email template retrieved")
  @Get("/mail/templates/{id}")
  public async getEmailTemplate(
    @Path() id: string
  ): Promise<GetEmailTemplateResponse> {
    try {
      const mailConfigService = new MailConfigService(
        new EncryptionService(process.env.MAIL_ENCRYPTION_KEY)
      )
      const template = await mailConfigService.getEmailTemplate(id)

      if (!template) {
        this.setStatus(StatusCodes.NOT_FOUND)
        return {
          error: getReasonPhrase(StatusCodes.NOT_FOUND),
          message: "Email template not found"
        }
      }

      this.setStatus(StatusCodes.OK)
      return { template }
    } catch (error) {
      console.error(`Error getting email template ${id}:`, error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message: "Failed to retrieve email template"
      }
    }
  }

  /**
   * Update or create an email template
   * @param requestBody The email template to update or create
   * @returns Success status and any error message
   */
  @SuccessResponse("200", "Email template updated")
  @Put("/mail/templates")
  public async updateEmailTemplate(
    @Body() requestBody: UpdateEmailTemplateRequestBody
  ): Promise<UpdateEmailTemplateResponse> {
    try {
      const mailConfigService = new MailConfigService(
        new EncryptionService(process.env.MAIL_ENCRYPTION_KEY)
      )

      // Validate that the template content is valid Pug
      try {
        pugCompile(requestBody.content)
      } catch (pugError) {
        this.setStatus(StatusCodes.BAD_REQUEST)
        return {
          error: `Invalid template content: ${pugError}`
        }
      }

      // Update the template
      await mailConfigService.updateEmailTemplate({
        id: requestBody.id,
        name: requestBody.name,
        content: requestBody.content,
        description: requestBody.description,
        updatedAt: new Date()
      })

      this.setStatus(StatusCodes.OK)
      return { message: "Email template updated successfully" }
    } catch (error) {
      console.error(`Error updating email template:`, error)
      this.setStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      return {
        error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message: "Failed to update email template"
      }
    }
  }
}
