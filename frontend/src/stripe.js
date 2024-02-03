// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require("stripe")("sk_test_...")
const express = require("express")
const app = express()

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_..."

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"]
    let event
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`)
      return
    }
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        // const paymentIntentSucceeded = event.data.object
        console.log("Payment Received")
        break
      // ... handle other event types
      default:
      //   console.log(`Unhandled event type ${event.type}`)
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send()
  }
)

app.listen(4242, () => console.log("Running on port 4242"))
