import AuthService from "business-layer/services/AuthService"
import {
  AuthServiceClaims,
  UserAccountTypes
} from "business-layer/utils/AuthServiceClaims"
import {
  DEFAULT_BOOKING_MAX_SLOTS,
  EMPTY_BOOKING_SLOTS
} from "business-layer/utils/BookingConstants"
import {
  firestoreTimestampToDate,
  timestampsInRange
} from "data-layer/adapters/DateUtils"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import UserDataService from "data-layer/services/UserDataService"
import { MakeDatesAvailableRequestBody } from "service-layer/request-models/AdminRequests"
import {
  CreateUserRequestBody,
  DemoteUserRequestBody,
  EditUsersRequestBody,
  PromoteUserRequestBody
} from "service-layer/request-models/UserRequests"
import { BookingSlotUpdateResponse } from "service-layer/response-models/BookingResponse"
import { AllUsersResponse } from "service-layer/response-models/UserResponse"
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Query,
  Route,
  Security,
  SuccessResponse
} from "tsoa"

@Route("admin")
@Security("jwt", ["admin"])
export class AdminController extends Controller {
  /**
   * Booking Operations
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
   *  User Operations
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

      const userAuthData = await new AuthService().bulkRetrieveUsersByUids(
        uidsToQuery
      )

      const combinedUserData = rawUserData.map((userInfo) => {
        const matchingUserRecord = userAuthData.find(
          (item) => item.uid === userInfo.uid
        )

        const { customClaims, email, metadata } = { ...matchingUserRecord } // to avoid undefined destructuring error

        let membership: UserAccountTypes = UserAccountTypes.GUEST

        if (customClaims) {
          if (customClaims[AuthServiceClaims.ADMIN]) {
            membership = UserAccountTypes.ADMIN
          } else if (customClaims[AuthServiceClaims.MEMBER]) {
            membership = UserAccountTypes.MEMBER
          }
        }

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

  // ticket 202 - endpoint to demote/promote users
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
}
