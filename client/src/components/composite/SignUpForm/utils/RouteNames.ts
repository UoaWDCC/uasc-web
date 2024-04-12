export const PERSONAL_ROUTE_1 = "personal_1" as const
export const PERSONAL_ROUTE_2 = "personal_2" as const
export const CONTACT_ROUTE = "contact" as const
export const ADDITIONAL_ROUTE = "additional" as const
export const PAYMENT_ROUTE = "payment" as const
export const CONFIRM_ROUTE = "confirm" as const

export type RouteNames =
  | typeof PERSONAL_ROUTE_1
  | typeof PERSONAL_ROUTE_2
  | typeof CONTACT_ROUTE
  | typeof ADDITIONAL_ROUTE
  | typeof PAYMENT_ROUTE
  | typeof CONFIRM_ROUTE
