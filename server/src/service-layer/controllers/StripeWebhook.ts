// import { StripeWebhookHeader } from "service-layer/request-models/StripeWebhook"
import { Controller, SuccessResponse, Route, Post, Request } from "tsoa"
import Stripe from "stripe"

@Route("webhook")
export class StripeWebhook extends Controller {
  @SuccessResponse(200, "Webhook post received")
  @Post()
  public async receiveWebhook(@Request() request: any): Promise<void> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY)

    const endPointSecret = process.env.STRIPE_LOCAL

    console.log("webhook received")
    try {
      const event = stripe.webhooks.constructEvent(
        // const event: Stripe.Event = stripe.webhooks.constructEvent(
        request.body,
        request.headers["stripe-signature"],
        endPointSecret
        // process.env.STRIPE_API_SECRET
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
      console.log(err)
      // set status to 400 due to bad request
      return this.setStatus(400)
    }
  }
}
