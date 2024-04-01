export interface StripeCheckoutRequestModel {
  client_reference_id: string
  return_url: string
  line_item: {
    price: string
    quanitity: number
  }
  metadata: any
}
