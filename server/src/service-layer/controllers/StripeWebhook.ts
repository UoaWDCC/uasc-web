import { Controller, SuccessResponse, Route, Post, Request } from "tsoa"
import Stripe from "stripe"
import UserDataService from "data-layer/services/UserDataService"
import AuthService from "business-layer/services/AuthService"
import {
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues
} from "business-layer/utils/StripeProductMetadata"
import StripeService from "business-layer/services/StripeService"

@Route("webhook")
export class StripeWebhook extends Controller {
  @Post()
  @SuccessResponse(200, "Webhook post received")
  public async receiveWebhook(@Request() request: any): Promise<void> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY)
    // Ensure security of the endpoint by constructing an event
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
    // Create services
    const userService = new UserDataService()
    const authService = new AuthService()
    const stripeService = new StripeService()

    switch (event.type) {
      case "payment_intent.succeeded":
        if (event.type === "payment_intent.succeeded") {
          console.debug("[WEBHOOK] received payment_intent.succeeded")
          // Stripe PaymentIntent
          const { customer } = event.data.object
          // Fetch the checkout session from the PaymentIntent ID
          const stripeSession =
            await stripeService.retrieveCheckoutSessionFromPaymentIntent(
              "checkout.session",
              customer.toString(),
              "complete"
            )
          const uid = stripeSession.data[0].client_reference_id
          if (!uid || !(await userService.getUserData(uid)))
            return this.setStatus(400) // bad request, non existent user
          if (
            stripeSession.data[0].metadata[CHECKOUT_TYPE_KEY] !==
            CheckoutTypeValues.MEMBERSHIP
          )
            return this.setStatus(400) // bad request, not the memberhip we want
          try {
            // need to update firestore
            await userService.editUserData(uid, {
              membership: "member" // only update their membership
            })
            // need to add member claim to user
            await authService.setCustomUserClaim(uid, "member")
            console.debug("[WEBHOOK] added membership")
          } catch (e) {
            console.error(e)
            return this.setStatus(500) // unknown server error
          }
        }
    }
    return this.setStatus(200) // set status to 200 as success
  }
}
