import { components } from "./__generated__/schema"

export type MembershipTypes = components["schemas"]["MembershipTypeValues"]

export type PricingDetails =
  components["schemas"]["MembershipStripeProductResponse"]["data"]
