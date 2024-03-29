import { Controller, SuccessResponse, Route, Post, Request } from "tsoa"
import Stripe from "stripe"

@Route("webhook")
export class StripeWebhook extends Controller {
  @Post()
  @SuccessResponse(200, "Webhook post received")
  public async receiveWebhook(@Request() request: any): Promise<void> {
    console.log("webhook received")

    const stripe = new Stripe(process.env.STRIPE_API_KEY)

    try {
      const event: Stripe.Event = stripe.webhooks.constructEvent(
        request.rawBody,
        request.headers["stripe-signature"],
        // process.env.STRIPE_LOCAL // test local api secret
        process.env.STRIPE_API_SECRET
      )
      switch (event.type) {
        case "payment_intent.succeeded":
          console.log("payment_intent.succeeded")
          break
        case "payment_method.attached":
          console.log("payment_method.attached")
          break
        default:
          console.log(`Unhandled event type ${event.type}.`)
      }

      return this.setStatus(200) // set status to 200 as success
    } catch (err) {
      console.error(err)
      // set status to 400 due to bad request
      return this.setStatus(400)
    }
  }
}
