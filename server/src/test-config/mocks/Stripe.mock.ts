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
