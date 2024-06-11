import StripeService from "business-layer/services/StripeService"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  BOOKING_SLOTS_KEY,
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues
} from "business-layer/utils/StripeSessionMetadata"
import {
  MembershipTypeValues,
  MEMBERSHIP_TYPE_KEY,
  LODGE_BOOKING_TYPE_KEY,
  LodgeBookingTypeValues
} from "business-layer/utils/StripeProductMetadata"
import {
  datesToDateRange,
  firestoreTimestampToDate
} from "data-layer/adapters/DateUtils"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import UserDataService from "data-layer/services/UserDataService"
import { Timestamp } from "firebase-admin/firestore"
import {
  UserPaymentRequestModel,
  SelfRequestModel,
  UserBookingRequestingModel
} from "service-layer/request-models/UserRequests"
import {
  BookingPaymentResponse,
  MembershipPaymentResponse
} from "service-layer/response-models/PaymentResponse"
import {
  Controller,
  Post,
  Get,
  Route,
  Request,
  Security,
  Query,
  SuccessResponse,
  Body
} from "tsoa"

@Route("payment")
export class PaymentController extends Controller {
  @SuccessResponse("200", "Session Fetched")
  @Security("jwt")
  @Get("checkout_status")
  public async getCheckoutSessionDetails(@Query() sessionId: string) {
    const stripeService = new StripeService()
    try {
      const session = await stripeService.getCheckoutSessionById(sessionId)
      const { status, customer_email, amount_total, metadata } = session

      return {
        status,
        customer_email,
        pricePaid: amount_total,
        metadata
      }
    } catch (e) {
      this.setStatus(500)
      return null
    }
  }

  @SuccessResponse("200", "Session created")
  @Security("jwt")
  @Post("membership")
  public async getMembershipPayment(
    @Request() request: SelfRequestModel,
    @Body() requestBody: UserPaymentRequestModel
  ): Promise<MembershipPaymentResponse> {
    try {
      const { uid, customClaims } = request.user
      if (customClaims && customClaims[AuthServiceClaims.MEMBER]) {
        // Can't pay for membership if already member
        this.setStatus(409)
        return { error: "Already a member" }
      }

      const stripeService = new StripeService()
      const userDataService = new UserDataService()

      const userData = await userDataService.getUserData(uid)

      /**
       * Generate customer id if required
       */
      const { newUser, stripeCustomerId } =
        await stripeService.createCustomerIfNotExist(
          request.user,
          userData,
          userDataService
        )
      if (!newUser) {
        /**
         * See if user already has active session
         */
        const activeSession = await stripeService.getActiveSessionForUser(
          stripeCustomerId,
          CheckoutTypeValues.MEMBERSHIP
        )
        if (activeSession) {
          const { client_secret, metadata } = activeSession
          this.setStatus(200)
          return {
            stripeClientSecret: client_secret,
            membershipType: metadata[
              MEMBERSHIP_TYPE_KEY
            ] as MembershipTypeValues,
            message: "Existing membership checkout session found"
          }
        }
        /**
         * See if user has pending payment or has recently paid -> if user didn't have a stripe id that means
         * they couldn't have a completed session
         */
        if (
          (await stripeService.hasRecentlyCompletedCheckoutSession(
            stripeCustomerId
          )) ||
          (await stripeService.hasProcessingPaymentIntent(stripeCustomerId))
        ) {
          this.setStatus(409)
          return {
            message: "Membership payment is still being processed"
          }
        }
      }

      /**
       * Check what price user is going to pay based on the details they filled in
       */
      const requiredMembership = requestBody.membershipType
      if (!requiredMembership) {
        this.setStatus(404)
        return {
          error:
            "No existing session could be found, and no new session could be created because membership type was not provided"
        }
      }
      /**
       * Get required product and generate client secret
       */
      const requiredMembershipProducts =
        await stripeService.getProductByMetadata(
          MEMBERSHIP_TYPE_KEY,
          requiredMembership
        )

      // We assume there will only be one active product at a time for memberships (needs to be communicated with admins)
      const requiredMembershipProduct = requiredMembershipProducts.find(
        (product) => product.active
      )

      // Note this will throw error if undefined (product wasn't found)
      const { default_price } = requiredMembershipProduct

      const clientSecret = await stripeService.createCheckoutSession(
        uid,
        // Note if the url changes workflows need to be updated to have the deployments work correctly
        `${process.env.FRONTEND_URL}/register/confirm?session_id={CHECKOUT_SESSION_ID}`,
        [
          {
            price: default_price as string,
            quantity: 1
          }
        ],
        // Set metadata to be found in webhook later
        {
          [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.MEMBERSHIP,
          [MEMBERSHIP_TYPE_KEY]: requiredMembership
        },
        stripeCustomerId
      )
      this.setStatus(200)
      return {
        stripeClientSecret: clientSecret,
        membershipType: requiredMembership
      }
    } catch (error) {
      console.error(error)
      this.setStatus(500)
      return { error: "Something went wrong" }
    }
  }

  @SuccessResponse("200", "Created booking checkout session")
  @Security("jwt")
  @Post("booking")
  public async getBookingPayment(
    @Request() request: SelfRequestModel,
    @Body() requestBody: UserBookingRequestingModel
  ): Promise<BookingPaymentResponse> {
    const { uid, customClaims } = request.user
    const { startDate, endDate } = requestBody
    if (!customClaims || !customClaims[AuthServiceClaims.MEMBER]) {
      this.setStatus(403)
      return {
        message: "Need a membership to create bookings"
      }
    }
    // Need to validate the booking date through a startDate and endDate range.
    const earliestDate = new Date()
    earliestDate.setUTCHours(0, 0, 0, 0)
    const latestDate = new Date(earliestDate)
    latestDate.setFullYear(earliestDate.getFullYear() + 1)
    // The request start and end dates
    if (
      endDate.seconds < startDate.seconds ||
      startDate.seconds * 1000 < earliestDate.getTime() ||
      endDate.seconds * 1000 > latestDate.getTime()
    ) {
      this.setStatus(401)
      return {
        error:
          "Invalid date, booking start date and end date must be in the range of today up to a year later. "
      }
    }
    // Calculate number of days of booking, returns a 0 indexed number
    function getNumberOfDays(startDate: Timestamp, endDate: Timestamp): number {
      const MILLIS_IN_A_DAY = 1000 * 60 * 60 * 24
      const numberOfDays =
        (startDate.seconds * 1000 - endDate.seconds * 1000) / MILLIS_IN_A_DAY
      return numberOfDays + 1
    }
    // Calculate number of days of booking
    const numberOfDays = getNumberOfDays(startDate, endDate)
    // Validate number of dates to avoid kiddies from forging bookings
    if (numberOfDays > 10) {
      this.setStatus(401)
      return {
        error: "Invalid date range, booking must be a maximum of 10 days. "
      }
    }
    // Create new Stripe checkout session
    const stripeService = new StripeService()
    const userDataService = new UserDataService()

    const userData = await userDataService.getUserData(uid)
    const { newUser, stripeCustomerId } =
      await stripeService.createCustomerIfNotExist(
        request.user,
        userData,
        userDataService
      )
    // If not a new Stripe customer, we want to check for pre-existing bookings
    if (!newUser) {
      const activeSession = await stripeService.getActiveSessionForUser(
        stripeCustomerId,
        CheckoutTypeValues.BOOKING
      )
      if (activeSession) {
        return {
          stripeClientSecret: activeSession.client_secret,
          message: "Existing booking checkout session found"
        }
      }
    }

    const recentActiveSessions = await stripeService.getRecentActiveSessions(
      CheckoutTypeValues.BOOKING,
      30
    )

    const bookingSlotService = new BookingSlotService()
    const bookingDataService = new BookingDataService()

    const bookingSlots =
      await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )
    // Create a date range list to validate against
    const daysList = datesToDateRange(
      firestoreTimestampToDate(startDate),
      firestoreTimestampToDate(endDate)
    )

    if (bookingSlots.length !== daysList.length) {
      this.setStatus(401)
      return {
        error: "No booking slot available for one or more dates."
      }
    }
    // iterate through the active stripe sessions and check metadata, reduce the bookingSlots available
    for (const session of recentActiveSessions) {
      const bookingSlotMetadata = session.metadata.booking_slots
      if (bookingSlotMetadata) {
        for (const bookingSlotId of bookingSlotMetadata) {
          const bookingSlot = bookingSlots.find(
            (slot) => slot.id === bookingSlotId
          )
          if (bookingSlot) {
            bookingSlot.max_bookings -= 1
          }
        }
      }
    }
    try {
      Promise.all(
        daysList.map(async (dateToValidate: Date, index: number) => {
          // booking slot id and max booking slots
          const { id, max_bookings } = bookingSlots[index]
          if (max_bookings < 1) {
            this.setStatus(401)
            return {
              error: "No booking slot available for one or more dates."
            }
          }
          const bookings = await bookingDataService.getBookingsBySlotId(id)
          if (bookings.some((booking) => booking.user_id === uid)) {
            this.setStatus(409)
            return {
              error: "User already has a booking for this date"
            }
          }
          return dateToValidate
        })
      )
    } catch (e) {
      this.setStatus(501)
      return {
        error: "Something went wrong"
      }
    }

    const FRIDAY = 5
    const SATURDAY = 6
    // get requiredBookingType
    let requiredBookingType: LodgeBookingTypeValues
    if (
      numberOfDays === 1 &&
      [FRIDAY, SATURDAY].includes(daysList[0].getUTCDay())
    ) {
      requiredBookingType = LodgeBookingTypeValues.SingleFridayOrSaturday
    } else {
      requiredBookingType = LodgeBookingTypeValues.Normal
    }

    // implement pricing logic
    const requiredBookingProducts = await stripeService.getProductByMetadata(
      LODGE_BOOKING_TYPE_KEY,
      requiredBookingType
    )
    const requiredBookingProduct = requiredBookingProducts.find(
      (product) => product.active
    )
    const { default_price } = requiredBookingProduct
    const clientSecret = await stripeService.createCheckoutSession(
      uid,
      `${process.env.FRONTEND_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
      [
        {
          price: default_price as string,
          quantity: 1
        }
      ],
      {
        [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.BOOKING,
        [LODGE_BOOKING_TYPE_KEY]: requiredBookingType,
        [BOOKING_SLOTS_KEY]: JSON.stringify(bookingSlots.map((slot) => slot.id))
      },
      stripeCustomerId
    )
    this.setStatus(200)
    return {
      stripeClientSecret: clientSecret
    }
  }
}
