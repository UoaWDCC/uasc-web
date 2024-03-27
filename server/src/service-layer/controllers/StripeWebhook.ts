import { StripeWebhookHeader } from "service-layer/request-models/StripeWebhook"
import { Controller, SuccessResponse, Route, Post, Body, Header } from "tsoa"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_API_KEY)

@Post()
@Route("webhook")
export class StripeWebhook extends Controller {
  @SuccessResponse(200, "Webhook post received")
  // public
  public async receiveWebhook(
    @Header() requestHeader: StripeWebhookHeader,
    @Body() requestBody: any
  ): Promise<void> {
    try {
      const event: Stripe.Event = stripe.webhooks.constructEvent(
        requestBody,
        requestHeader["stripe-signature"],
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
      // set status to 400 due to bad request
      return this.setStatus(400)
    }
  }
}
