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
import { MembershipTypes } from "models/Payment"

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

/**
 * @param membershipType the type of membership type to display the membership alert for
 * @returns a formatted string with the required message
 */
export const getMembershipTypeConfirmationMessage = (
  membershipType: MembershipTypes
) => {
  const formatMessage = (
    membershipName: string,
    membershipDescription: string
  ) =>
    `Are you sure you want to select the ${membershipName} membership type? ${membershipDescription}` as const

  switch (membershipType) {
    case "uoa_student":
      return formatMessage(
        "UoA Student: returning and new",
        "This is for all students who currently attend UoA, both returning and new"
      )

    case "returning_member":
      return formatMessage(
        "Non-student: returning member",
        "This is for non-students who were are returning"
      )
    case "non_uoa_student":
      return formatMessage(
        "Non-UoA student: returning and new",
        "This is for all non-UoA students, both returning and new"
      )
    case "new_non_student":
      return formatMessage(
        "Non-student: new member",
        "This is for non-students who are new to the club"
      )
  }
}
