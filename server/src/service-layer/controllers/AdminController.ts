import AuthService from "business-layer/services/AuthService"
import {
  DEFAULT_BOOKING_MAX_SLOTS,
  EMPTY_BOOKING_SLOTS
} from "business-layer/utils/BookingConstants"
import {
  firestoreTimestampToDate,
  timestampsInRange
} from "data-layer/adapters/DateUtils"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import UserDataService from "data-layer/services/UserDataService"
import {
  DeleteBookingRequest,
  AddCouponRequestBody,
  MakeDatesAvailableRequestBody
} from "service-layer/request-models/AdminRequests"
import {
  CreateBookingsRequestModel,
  CreateUserRequestBody,
  DemoteUserRequestBody,
  EditUsersRequestBody,
  PromoteUserRequestBody
} from "service-layer/request-models/UserRequests"
import {
  BookingCreateResponse,
  BookingDeleteResponse,
  BookingSlotUpdateResponse
} from "service-layer/response-models/BookingResponse"
import {
  AllUsersResponse,
  GetUserResponse
} from "service-layer/response-models/UserResponse"
import {
  Body,
  Controller,
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
import { UserAccountTypes } from "../../business-layer/utils/AuthServiceClaims"
import { UserRecord } from "firebase-admin/auth"

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
      this.setStatus(201)
      return { updatedBookingSlots: bookingSlotIds }
    } catch (e) {
      this.setStatus(500)
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
      this.setStatus(201)
      return {
        updatedBookingSlots: bookingSlotIds.filter((id) => !!id) // No way to "skip" with map
      }
    } catch (e) {
      this.setStatus(500)
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
  ): Promise<BookingCreateResponse> {
    try {
      const { startDate, endDate, userId } = requestBody

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
      })

      await Promise.all(bookingPromises)

      this.setStatus(200)

      /**
       * Returning the response data
       *
       * The filter is required to not include data that is null
       * because of the early return in the map
       */
      return {
        data: {
          bookedDates: bookingSlots.map((slot) => slot.date),
          user: userId
        }
      }
    } catch (e) {
      console.error("Error in getBookingsByDateRange:", e)
      this.setStatus(500)

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
    try {
      const booking = await bookingDataService.getBookingById(bookingID)
      user_id = booking.user_id
    } catch (err) {
      this.setStatus(404)
      return { message: "Booking not found with that booking ID." }
    }
    // attempt to delete
    await bookingDataService.deleteBooking(bookingID)
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
      this.setStatus(400)
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

      this.setStatus(200)

      return { data: combinedUserData, nextCursor }
    } catch (e) {
      console.error("Failed to fetch all users", e)
      this.setStatus(500)
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
        this.setStatus(404)
        return { error: "User not found" }
      }

      const authService = new AuthService()
      const userAuthData = await authService.retrieveUserByUid(uid)
      const { customClaims, email, metadata } = { ...userAuthData }
      const membership: UserAccountTypes =
        authService.getMembershipType(customClaims)
      this.setStatus(200)
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
      this.setStatus(500)
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
      this.setStatus(409)
      return
    }
    await new UserDataService().createUserData(uid, user)
    this.setStatus(200)
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
    this.setStatus(200)
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
    if (!user) return this.setStatus(400) // bad request
    const userClaimRole = await authService.getCustomerUserClaim(
      requestBody.uid
    )
    if (userClaimRole?.admin) return this.setStatus(403) // admin forbidden
    if (userClaimRole?.member) return this.setStatus(409) // conflict
    try {
      // update user claims in AuthService
      await authService.setCustomUserClaim(requestBody.uid, "member")
      this.setStatus(200)
    } catch (e) {
      console.error(e)
      this.setStatus(500) // unknown server error?
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
    if (!user) return this.setStatus(400) // bad request
    const userClaimRole = await authService.getCustomerUserClaim(
      requestBody.uid
    )
    if (userClaimRole?.admin) return this.setStatus(403) // admin forbidden
    if (!userClaimRole?.member) return this.setStatus(409) // conflict
    try {
      // update user claims in AuthService, set to null to delete the claim
      await authService.setCustomUserClaim(requestBody.uid, null)
      this.setStatus(200)
    } catch (e) {
      console.error(e)
      this.setStatus(500) // unknown server error?
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
    const authService = new AuthService()
    let allUsers: UserRecord[] = await authService.getAllUsers()
    allUsers = allUsers.filter(
      (user) => !user.customClaims.admin && user.customClaims.member
    )
    const demotePromises = await Promise.all(
      allUsers.map((user) => {
        return authService.setCustomUserClaim(user.uid, null)
      })
    )
    if (demotePromises) {
      this.setStatus(200)
    } else {
      this.setStatus(500)
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
        this.setStatus(404)
        return
      }
      if (!user.stripe_id) {
        this.setStatus(400)
        return
      }

      // Add coupon to the user using Stripe ID
      const couponPromises = Array.from(
        { length: quantity },
        async () => await stripeService.addCouponToUser(user.stripe_id, amount)
      )
      await Promise.all(couponPromises)

      this.setStatus(200)
    } catch (e) {
      this.setStatus(500)
    }
  }
}
