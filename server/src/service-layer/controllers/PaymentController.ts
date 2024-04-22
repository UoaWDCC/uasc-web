import PricingService from "business-layer/services/PricingService"
import StripeService from "business-layer/services/StripeService"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  CHECKOUT_TYPE_KEY,
  CHECKOUT_TYPE_VALUES,
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
  @SuccessResponse("200", "Users found")
  @Security("jwt")
  @Get("membership")
  public async getMembershipPayment(
    @Request() request: SelfRequestModel
  ): Promise<MembershipPaymentResponse> {
    try {
      const { uid, customClaims } = request.user
      if (customClaims[AuthServiceClaims.MEMBER]) {
        // Can't pay for membership if already member
        this.setStatus(409)
        return { error: "Already a member" }
      }

      /**
       * Check what price user is going to pay based on the details they filled in
       */
      const userData = await new UserDataService().getUserData(uid)

      const requiredMembership = new PricingService().getMembershipType(
        userData
      )
      /**
       * Get required product and generate client secret
       */
      const stripeService = new StripeService()
      const [requiredMembershipProduct] =
        await stripeService.getProductByMetadata(
          MEMBERSHIP_TYPE_KEY,
          requiredMembership
        )

      // Note this will throw error if undefined (product wasn't found)
      const { default_price } = requiredMembershipProduct

      const clientSecret = await stripeService.createCheckoutSession(
        uid,
        process.env.FRONTEND_URL,
        {
          price: default_price as string,
          quantity: 1
        },
        // Set metadata to be found in webhook later
        { [CHECKOUT_TYPE_KEY]: CHECKOUT_TYPE_VALUES.MEMBERSHIP }
      )
      return { clientSecret, membershipType: requiredMembership }
    } catch (error) {
      console.error(error)
      this.setStatus(500)
      return { error: "Something went wrong" }
    }
  }
}
