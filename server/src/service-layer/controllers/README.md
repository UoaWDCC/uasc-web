# Controllers

Controller methods convert requests coming from the routes and convert to HTTP responses

See the [tsoa docs](https://tsoa-community.github.io/docs/examples.html) for how to write controllers (These will automatically be converted to routes)

## Stripe Webhook

For local testing, ensure that your .env file has a STRIPE_LOCAL key, which stores the stripe local webhook key for testing purposes.

Follow the current [link](https://docs.stripe.com/webhooks#test-webhook) for local testing.
