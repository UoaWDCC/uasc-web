import {
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues
} from "business-layer/utils/StripeSessionMetadata"
import type * as Stripe from "stripe"

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

export const checkoutSessionMock: Stripe.Stripe.Checkout.Session = {
  id: "cs_test_a11YYufWQzNY63zpQ6QSNRQhkUpVph4WRmzW0zWJO2znZKdVujZ0N0S22u",
  object: "checkout.session",
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 2198,
  amount_total: 2198,
  automatic_tax: {
    enabled: false,
    liability: null,
    status: null
  },
  billing_address_collection: null,
  cancel_url: null,
  client_reference_id: "guest-user",
  consent: null,
  consent_collection: null,
  created: 1679600215,
  currency: "usd",
  custom_fields: [],
  custom_text: {
    shipping_address: null,
    submit: null,
    after_submit: undefined,
    terms_of_service_acceptance: undefined
  },
  customer: null,
  customer_creation: "if_required",
  customer_details: null,
  customer_email: null,
  expires_at: 1679686615,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      issuer: null,
      metadata: {},
      rendering_options: null
    }
  },
  livemode: false,
  locale: null,
  metadata: {
    [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.MEMBERSHIP
  },
  mode: "payment",
  payment_intent: null,
  payment_link: null,
  payment_method_collection: "always",
  payment_method_options: {},
  payment_method_types: ["card"],
  payment_status: "unpaid",
  phone_number_collection: {
    enabled: false
  },
  recovered_from: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_details: null,
  shipping_options: [],
  status: "open",
  submit_type: null,
  subscription: null,
  success_url: "https://example.com/success",
  total_details: {
    amount_discount: 0,
    amount_shipping: 0,
    amount_tax: 0
  },
  url: null,
  client_secret: "",
  currency_conversion: undefined,
  payment_method_configuration_details: undefined,
  ui_mode: "embedded"
}
