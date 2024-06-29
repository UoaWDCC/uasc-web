import { Controller, SuccessResponse, Route, Post, Request } from "tsoa"
import Stripe from "stripe"
import UserDataService from "data-layer/services/UserDataService"
import {} from "business-layer/utils/StripeProductMetadata"
import StripeService from "business-layer/services/StripeService"
import { UnreachableCase } from "business-layer/utils/UnreachableCase"
import {
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues
} from "business-layer/utils/StripeSessionMetadata"
import BookingSlotService from "../../data-layer/services/BookingSlotsService"

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
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.error(err)
      return this.setStatus(401) // unauthorized request
    }

    // Create services
    const userService = new UserDataService()
    const stripeService = new StripeService()
    const bookingSlotService = new BookingSlotService()

    switch (event.type) {
      case "payment_intent.succeeded":
        if (event.type === "payment_intent.succeeded") {
          console.log("[WEBHOOK] received payment_intent.succeeded")
          // Stripe PaymentIntent
          const { id: payment_intent_id } = event.data.object
          console.log(
            `[WEBHOOK] received payment intent succeeded for payment intent '${payment_intent_id}'`
          )
          // Fetch the checkout session from the PaymentIntent ID
          const session =
            await stripeService.retrieveCheckoutSessionFromPaymentIntent(
              payment_intent_id
            )
          const uid = session.client_reference_id
          if (uid === undefined || !(await userService.getUserData(uid))) {
            console.log(
              `[WEBHOOK] internal error: failed to fetch uid from stripe session '${session.id}' (payment intent '${payment_intent_id}')`
            )
            return this.setStatus(400)
          }

          const checkoutType = Object.values(CheckoutTypeValues).find(
            (c) => c === session.metadata[CHECKOUT_TYPE_KEY]
          )
          if (checkoutType === undefined) {
            console.log(
              `[WEBHOOK] internal error: session '${session.id}' had no checkout type metadata (payment intent '${payment_intent_id}')`
            )
            return this.setStatus(400) // bad request, not the membership we want
          }

          switch (checkoutType) {
            case CheckoutTypeValues.BOOKING: {
              try {
                await stripeService.handleBookingPaymentSession(uid, session)

                // Check if the last spot is taken and expire other sessions
                const date = session.metadata.date
                const isLastSpot =
                  await bookingSlotService.isLastSpotTaken(date)
                if (isLastSpot) {
                  await this.expireOtherCheckoutSessions(stripe, date)
                }
              } catch (e) {
                console.error(
                  `[WEBHOOK] Failed to handle booking payment session '${session.id}': ${e}`
                )
                return this.setStatus(500)
              }
              return this.setStatus(200)
            }
            case CheckoutTypeValues.MEMBERSHIP: {
              try {
                await stripeService.handleMembershipPaymentSession(uid)
              } catch (e) {
                console.error(
                  `[WEBHOOK] Failed to handle membership payment session '${session.id}': ${e}`
                )
                return this.setStatus(500)
              }
              console.log(
                `[WEBHOOK] added membership to user '${uid}' from session '${session.id}'`
              )
              return this.setStatus(200)
            }
            default: {
              throw new UnreachableCase(checkoutType)
            }
          }
        }
    }

    return this.setStatus(501)
  }

  private async expireOtherCheckoutSessions(
    stripe: Stripe,
    date: string
  ): Promise<void> {
    try {
      // Fetch all checkout sessions for the specific date
      const sessions = await stripe.checkout.sessions.list({
        limit: 100,
        expand: ["data.payment_intent"]
      })

      const sessionsToExpire = sessions.data.filter(
        (session) =>
          session.metadata.date === date &&
          (session.payment_intent as Stripe.PaymentIntent)?.status ===
            "requires_payment_method"
      )

      // Expire each session that matches the date
      await Promise.all(
        sessionsToExpire.map(async (session) => {
          if (session.id) {
            await stripe.checkout.sessions.expire(session.id)
          }
        })
      )

      console.log(
        `[WEBHOOK] Expired ${sessionsToExpire.length} sessions for date ${date}`
      )
    } catch (err) {
      console.error(`[WEBHOOK] Error expiring checkout sessions: ${err}`)
    }
  }
}
