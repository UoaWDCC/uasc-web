import { Controller, SuccessResponse, Route, Post, Request } from "tsoa"
import Stripe from "stripe"
import UserDataService from "data-layer/services/UserDataService"
import AuthService from "business-layer/services/AuthService"
import {
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues
} from "business-layer/utils/StripeProductMetadata"

@Route("webhook")
export class StripeWebhook extends Controller {
  @Post()
  @SuccessResponse(200, "Webhook post received")
  public async receiveWebhook(@Request() request: any): Promise<void> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY)
    // ensure security of the endpoint by constructing an event
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        request.headers["stripe-signature"],
        process.env.STRIPE_LOCAL
        // process.env.STRIPE_API_SECRET
      )
    } catch (err) {
      console.error(err)
      return this.setStatus(401) // unauthorized request
    }
    // console.log(event.type)
    if (event.type === "payment_intent.succeeded") {
      // console.log("[WEBHOOK] received: payment_intent.succeeded")
      console.log(request.body)
      const userService = new UserDataService()
      const authService = new AuthService()
      // Stripe PaymentIntent
      const { id } = event.data.object
      // Fetch the checkout session from the PaymentIntent ID
      const stripeSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.retrieve(id)
      const uid = stripeSession.client_reference_id

      if (!uid || !(await userService.getUserData(uid)))
        return this.setStatus(400) // bad request, non existent user
      if (
        event.data.object.metadata[CHECKOUT_TYPE_KEY] ===
        CheckoutTypeValues.MEMBERSHIP
      ) {
        try {
          // need to update firestore
          await userService.editUserData(uid, {
            membership: "member"
          })
          // need to add member claim to user
          await authService.setCustomUserClaim(uid, "member")
          console.log(
            "successfully received checkout.session.completed and added membership"
          )
        } catch (e) {
          console.error(e)
          return this.setStatus(500) // unknown server error
        }
      }
    }
    return this.setStatus(200) // set status to 200 as success
  }
}
