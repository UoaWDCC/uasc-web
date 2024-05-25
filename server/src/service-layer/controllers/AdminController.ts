import AuthService from "business-layer/services/AuthService"
import {
  DEFAULT_BOOKING_MAX_SLOTS,
  EMPTY_BOOKING_SLOTS
} from "business-layer/utils/BookingConstants"
import {
  dateToFirestoreTimeStamp,
  datesToDateRange
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
import { CommonResponse } from "service-layer/response-models/CommonResponse"
import { UserResponse } from "service-layer/response-models/UserResponse"
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
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
  @Post("/bookings/make-date-available")
  public async makeDateAvailable(
    @Body() requestBody: MakeDatesAvailableRequestBody
  ): Promise<{ bookingSlotIds?: string[] } & CommonResponse> {
    const { startDate, endDate } = requestBody
    const bookingSlotService = new BookingSlotService()

    const dates = datesToDateRange(
      new Date(startDate.seconds * 1000),
      new Date(endDate.seconds * 1000)
    )

    const datesToUpdatePromises = dates.map(async (date) => {
      try {
        const dateTimestamp = dateToFirestoreTimeStamp(date)
        const [bookingSlotForDate] =
          await bookingSlotService.getBookingSlotByDate(dateTimestamp)

        if (!bookingSlotForDate) {
          const bookingSlot = await bookingSlotService.createBookingSlot({
            date: dateTimestamp,
            max_bookings: DEFAULT_BOOKING_MAX_SLOTS
          })
          return bookingSlot.id
        }

        // Was unavailable
        if (bookingSlotForDate.max_bookings <= EMPTY_BOOKING_SLOTS) {
          await bookingSlotService.updateBookingSlot(bookingSlotForDate.id, {
            max_bookings: DEFAULT_BOOKING_MAX_SLOTS
          })
        }

        return bookingSlotForDate.id
      } catch (e) {
        console.error(
          `Something went wrong when trying to make the date ${date.toString()} available`
        )
        return undefined
      }
    })

    try {
      const bookingSlotIds = await Promise.all(datesToUpdatePromises)
      this.setStatus(201)
      return { bookingSlotIds }
    } catch (e) {
      this.setStatus(500)
      console.error(`An error occurred when making dates available: ${e}`)
      return { error: "Something went wrong when making dates available" }
    }
  }

  /**
   *  User Operations
   */

  @SuccessResponse("200", "Users found")
  @Security("jwt", ["admin"])
  @Get("/users")
  public async getAllUsers(): Promise<UserResponse[]> {
    const data = await new UserDataService().getAllUserData()
    this.setStatus(200)
    return data
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
