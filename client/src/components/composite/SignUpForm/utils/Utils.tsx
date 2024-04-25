import { useParams } from "react-router-dom"
import { PAGES } from "../PageConfig/PageConfig"
import {
  ADDITIONAL_ROUTE,
  CONFIRM_ROUTE,
  CONTACT_ROUTE,
  PAYMENT_INFORMATION_ROUTE,
  PAYMENT_ROUTE,
  PERSONAL_ROUTE_1,
  PERSONAL_ROUTE_2,
  RouteNames
} from "./RouteNames"

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

    default:
      return PAGES.Unknown
  }
}

export const oneLevelUp = (route: string) => {
  return `../${route}`
}
