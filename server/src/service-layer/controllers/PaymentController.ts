import StripeService from "business-layer/services/StripeService"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  MembershipTypeValues,
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues,
  MEMBERSHIP_TYPE_KEY
} from "business-layer/utils/StripeProductMetadata"
import UserDataService from "data-layer/services/UserDataService"
import {
  UserPaymentRequestModel,
  SelfRequestModel
} from "service-layer/request-models/UserRequests"
import { MembershipPaymentResponse } from "service-layer/response-models/PaymentResponse"
import {
  Controller,
  Post,
  Route,
  Request,
  Security,
  SuccessResponse,
  Body
} from "tsoa"

@Route("payment")
export class PaymentController extends Controller {
  @SuccessResponse("200", "Session created")
  @Security("jwt")
  @Post("membership")
  public async getMembershipPayment(
    @Request() request: SelfRequestModel,
    @Body() requestBody: UserPaymentRequestModel
  ): Promise<MembershipPaymentResponse> {
    try {
      const { uid, email, customClaims } = request.user
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
      let stripeCustomerId: string
      if (!userData.stripe_id) {
        const { first_name, last_name } = userData // Assume user doesn't troll
        const displayName = `${first_name} ${last_name} ${email}`
        const { id } = await stripeService.createNewUser(
          displayName,
          email,
          uid
        )
        stripeCustomerId = id
        await userDataService.editUserData(uid, { stripe_id: stripeCustomerId })
      } else {
        stripeCustomerId = userData.stripe_id
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
            message: "existing session found"
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
            message: "Payment is still being processed"
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
}
