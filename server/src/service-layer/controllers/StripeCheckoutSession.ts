import { StripeCheckoutRequestModel } from "service-layer/request-models/StripeCheckoutRequest"
import { StripeCheckoutResponse } from "service-layer/response-models/StripeCheckoutResponse"
import Stripe from "stripe"
import { Controller, Post, Route, SuccessResponse, Request, Body } from "tsoa"

@Route("create-checkout-session")
export class CreateCheckoutSession extends Controller {
  @Post()
  @SuccessResponse(200, "Successful checkout session creation")
  public async createCheckoutSession(
    @Request() request: any,
    @Body() requestBody: StripeCheckoutRequestModel
  ): Promise<StripeCheckoutResponse> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY)
    try {
      const session = await stripe.checkout.sessions.create({
        // consumer changeable
        client_reference_id: requestBody.client_reference_id,
        return_url: requestBody.return_url,
        line_items: [requestBody.line_item],
        metadata: requestBody.metadata,
        // configured internally and should not change
        ui_mode: "embedded",
        mode: "payment",
        currency: "NZD"
      })
      this.setStatus(200)
      return { clientSecret: session.client_secret }
    } catch (e) {
      this.setStatus(400)
      return { clientSecret: null }
    }
  }
}
