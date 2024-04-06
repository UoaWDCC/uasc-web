import { Controller, SuccessResponse, Route, Post, Request } from "tsoa"
import Stripe from "stripe"
import UserDataService from "data-layer/services/UserDataService"
import AuthService from "business-layer/services/AuthService"

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
        // process.env.STRIPE_LOCAL
        process.env.STRIPE_API_SECRET
      )
    } catch (err) {
      console.error(err)
      return this.setStatus(401) // unauthorized request
    }
    // handle successful checkout
    if (event.type === "checkout.session.completed") {
      const userService = new UserDataService()
      const authService = new AuthService()
      const uid = event.data.object.client_reference_id
      if (!uid || !(await userService.userDataExists(uid))) this.setStatus(400) // bad request, non existent user
      if (event.data.object.metadata?.type === "membership") {
        try {
          // need to update firestore
          await userService.editUserData(uid, {
            membership: "member"
          })
          // need to add member claim to user
          await authService.setCustomUserClaim(uid, "member")
        } catch (e) {
          return this.setStatus(500) // unknown server error
        }
      }
    }
    return this.setStatus(200) // set status to 200 as success
  }
}
