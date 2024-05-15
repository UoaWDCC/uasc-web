import { useParams } from "react-router-dom"
import {
  ACCOUNT_SETUP_ROUTE,
  ADDITIONAL_ROUTE,
  CONFIRM_ROUTE,
  CONTACT_ROUTE,
  PAGES,
  PAYMENT_INFORMATION_ROUTE,
  PAYMENT_ROUTE,
  PERSONAL_ROUTE_1,
  PERSONAL_ROUTE_2,
  RouteNames,
  SUCCESS_ROUTE
} from "./RouteNames"

export const oneLevelUp = (route: string) => {
  return `../${route}`
}

export const useCurrentStep = (): PAGES => {
  const { step } = useParams<{ step: RouteNames }>()

  switch (step) {
    case PERSONAL_ROUTE_1:
      return PAGES.PersonalFirst

    case PERSONAL_ROUTE_2:
      return PAGES.PersonalSecond

    case CONTACT_ROUTE:
      return PAGES.Contact

    case ADDITIONAL_ROUTE:
      return PAGES.Additional

    case PAYMENT_INFORMATION_ROUTE:
      return PAGES.PaymentInfo

    case PAYMENT_ROUTE:
      return PAGES.Payment

    case CONFIRM_ROUTE:
      return PAGES.Confirm

    case ACCOUNT_SETUP_ROUTE:
      return PAGES.AccountSetup

    case SUCCESS_ROUTE:
      return PAGES.Success

    default:
      return PAGES.Unknown
  }
}
