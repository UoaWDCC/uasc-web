import * as Stripe from "stripe"

export const customerMock: Stripe.Stripe.Customer = {
  id: "cus_123456789",
  object: "customer",
  address: {
    city: "city",
    country: "NZ",
    line1: "line 1",
    line2: "line 2",
    postal_code: "90210",
    state: "Auckland"
  },
  balance: 0,
  created: 1483565364,
  currency: null,
  default_source: null,
  delinquent: false,
  description: null,
  discount: null,
  email: null,
  invoice_prefix: "C11F7E1",
  invoice_settings: {
    custom_fields: null,
    default_payment_method: null,
    footer: null,
    rendering_options: null
  },
  livemode: false,
  metadata: {
    order_id: "6735"
  },
  name: null,
  next_invoice_sequence: 1,
  phone: null,
  preferred_locales: [],
  shipping: null,
  tax_exempt: "none"
}

export const productMock: Stripe.Stripe.Product = {
  id: "prod_NWjs8kKbJWmuuc",
  object: "product",
  active: true,
  created: 1678833149,
  default_price: null,
  description: null,
  images: [],
  features: [],
  livemode: false,
  metadata: {},
  name: "Gold Plan",
  package_dimensions: null,
  shippable: null,
  statement_descriptor: null,
  tax_code: null,
  unit_label: null,
  updated: 1678833149,
  url: null,
  type: "good"
}

export const priceMock: Stripe.Stripe.Price = {
  id: "price_1MoBy5LkdIwHu7ixZhnattbh",
  object: "price",
  active: true,
  billing_scheme: "per_unit",
  created: 1679431181,
  currency: "usd",
  custom_unit_amount: null,
  livemode: false,
  lookup_key: null,
  metadata: {},
  nickname: null,
  product: "prod_NZKdYqrwEYx6iK",
  recurring: {
    aggregate_usage: null,
    interval: "month",
    interval_count: 1,
    trial_period_days: null,
    usage_type: "licensed"
  },
  tax_behavior: "unspecified",
  tiers_mode: null,
  transform_quantity: null,
  type: "recurring",
  unit_amount: 1000,
  unit_amount_decimal: "1000"
}

export const PaymentIntentMock: Stripe.Stripe.PaymentIntent = {
  id: "cs_test_a1rWw8m5XWYB9YmnIjrnkgHmH6lQWJGbmsKK8BTkpPOHgpo89ZtzAjYQcm",
  object: "payment_intent",
  amount: 3000,
  amount_capturable: 0,
  amount_details: {
    tip: {}
  },
  amount_received: 0,
  application: null,
  application_fee_amount: null,
  automatic_payment_methods: null,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: "automatic",
  client_secret: "pi_3P2mwfCSPCt0G0wZ18wj8f2Y_secret_18k0QiBS95abQFueJFK0KvVOd",
  confirmation_method: "automatic",
  created: 1712462585,
  currency: "usd",
  customer: null,
  description: null,
  invoice: null,
  last_payment_error: null,
  latest_charge: null,
  livemode: false,
  metadata: {},
  next_action: null,
  on_behalf_of: null,
  payment_method: null,
  payment_method_configuration_details: null,
  payment_method_options: {
    card: {
      installments: null,
      mandate_options: null,
      network: null,
      request_three_d_secure: "automatic"
    }
  },
  payment_method_types: ["card"],
  processing: null,
  receipt_email: null,
  review: null,
  setup_future_usage: null,
  shipping: {
    address: {
      city: "San Francisco",
      country: "US",
      line1: "510 Townsend St",
      line2: null,
      postal_code: "94103",
      state: "CA"
    },
    carrier: null,
    name: "Jenny Rosen",
    phone: null,
    tracking_number: null
  },
  source: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: "requires_payment_method",
  transfer_data: null,
  transfer_group: null
}
