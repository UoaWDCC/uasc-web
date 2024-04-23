import PricingService from "business-layer/services/PricingService"
import StripeService from "business-layer/services/StripeService"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  MembershipTypeValues,
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues,
  MEMBERSHIP_TYPE_KEY
} from "business-layer/utils/StripeProductMetadata"
import UserDataService from "data-layer/services/UserDataService"
import { SelfRequestModel } from "service-layer/request-models/UserRequests"
import { MembershipPaymentResponse } from "service-layer/response-models/PaymentResponse"
import {
  Controller,
  Get,
  Route,
  Request,
  Security,
  SuccessResponse
} from "tsoa"

@Route("payment")
export class PaymentController extends Controller {
  @SuccessResponse("200", "Session created")
  @Security("jwt")
  @Get("membership")
  public async getMembershipPayment(
    @Request() request: SelfRequestModel
  ): Promise<MembershipPaymentResponse> {
    try {
      const { uid, email, customClaims } = request.user
      if (customClaims[AuthServiceClaims.MEMBER]) {
        // Can't pay for membership if already member
        this.setStatus(409)
        return { error: "Already a member" }
      }

      const stripeService = new StripeService()

      /**
       * See if user has pending payment or has recently paid
       */
      const userData = await new UserDataService().getUserData(uid)
      const { stripe_id } = userData
      if (
        (await stripeService.hasRecentlyCompletedCheckoutSession(stripe_id)) ||
        (await stripeService.hasProcessingPaymentIntent(stripe_id))
      ) {
        this.setStatus(409)
        return {
          message: "Payment is still being processed"
        }
      }
      /**
       * See if user already has active session
       */
      const activeSession = await stripeService.getActiveSessionForUser(
        email,
        CheckoutTypeValues.MEMBERSHIP
      )
      if (activeSession) {
        const { client_secret, metadata } = activeSession
        this.setStatus(200)
        return {
          clientSecret: client_secret,
          membershipType: metadata[MEMBERSHIP_TYPE_KEY] as MembershipTypeValues,
          message: "existing session found"
        }
      }
      /**
       * Check what price user is going to pay based on the details they filled in
       */

      const requiredMembership = new PricingService().getMembershipType(
        userData
      )

      /**
       * Generate customer id if required
       */
      let stripeCustomerId: string
      if (!userData.stripe_id) {
        const { id } = await stripeService.createNewUser(email, uid)
        stripeCustomerId = id
      } else {
        stripeCustomerId = userData.stripe_id
      }

      /**
       * Get required product and generate client secret
       */
      const [requiredMembershipProduct] =
        await stripeService.getProductByMetadata(
          MEMBERSHIP_TYPE_KEY,
          requiredMembership
        )

      // Note this will throw error if undefined (product wasn't found)
      const { default_price } = requiredMembershipProduct

      const clientSecret = await stripeService.createCheckoutSession(
        uid,
        email,
        // Note if the url changes workflows need to be updated to have the deployments work correctly
        `${process.env.FRONTEND_URL}/register/confirm`,
        {
          price: default_price as string,
          quantity: 1
        },
        // Set metadata to be found in webhook later
        {
          [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.MEMBERSHIP,
          [MEMBERSHIP_TYPE_KEY]: requiredMembership
        },
        stripeCustomerId
      )
      return { clientSecret, membershipType: requiredMembership }
    } catch (error) {
      console.error(error)
      this.setStatus(500)
      return { error: "Something went wrong" }
    }
  }
}
