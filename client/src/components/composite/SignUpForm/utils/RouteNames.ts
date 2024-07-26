export const PERSONAL_ROUTE_1 = "personal_1" as const
export const PERSONAL_ROUTE_2 = "personal_2" as const
export const CONTACT_ROUTE = "contact" as const
export const ADDITIONAL_ROUTE = "additional" as const
export const CONFIRM_DETAILS_ROUTE = "confirm-details" as const
export const PAYMENT_INFORMATION_ROUTE = "payment-info" as const
export const PAYMENT_ROUTE = "payment" as const
export const CONFIRM_ROUTE = "confirm" as const
export const ACCOUNT_SETUP_ROUTE = "setup" as const
export const SUCCESS_ROUTE = "success" as const

export type RouteNames =
  | typeof PERSONAL_ROUTE_1
  | typeof PERSONAL_ROUTE_2
  | typeof CONTACT_ROUTE
  | typeof ADDITIONAL_ROUTE
  | typeof CONFIRM_DETAILS_ROUTE
  | typeof PAYMENT_INFORMATION_ROUTE
  | typeof PAYMENT_ROUTE
  | typeof CONFIRM_ROUTE
  | typeof ACCOUNT_SETUP_ROUTE
  | typeof SUCCESS_ROUTE

/**
 * Order of all these matters!
 */
export enum PAGES {
  PersonalFirst = 0,
  PersonalSecond,
  Contact,
  Additional,
  ConfirmDetails,
  PaymentInfo,
  Payment,
  Confirm,
  AccountSetup,
  Success,
  Unknown
}
