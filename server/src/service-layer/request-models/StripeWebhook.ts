export interface StripeWebhookBody {
  id: string
  object: string
  type: string
  data: {
    object: {
      id: string
    }
  }
  pending_webhooks: integer
}

export interface StripeWebhookHeader {
  "stripe-signature": string
}
