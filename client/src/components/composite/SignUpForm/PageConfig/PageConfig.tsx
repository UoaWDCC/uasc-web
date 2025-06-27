import type { PageProps } from "@/components/generic/PaginatedForm/PaginatedForm"
import {
  PersonalSectionFirst,
  PersonalSectionSecond
} from "../Sections/PersonalSection"
import { ContactSection } from "../Sections/ContactSection"
import { AdditionalSection } from "../Sections/AdditionalSection"
import { ConfirmDetailsSection } from "../Sections/ConfirmDetailsSection"
import ConfirmationSection from "../Sections/ConfirmationSection"
import SuccessSection from "../Sections/SuccessSection"

import {
  ACCOUNT_SETUP_ROUTE,
  ADDITIONAL_ROUTE,
  CONTACT_ROUTE,
  PAGES,
  PAYMENT_INFORMATION_ROUTE,
  CONFIRM_DETAILS_ROUTE,
  PAYMENT_ROUTE,
  PERSONAL_ROUTE_1,
  PERSONAL_ROUTE_2,
  type RouteNames
} from "../utils/RouteNames"
import {
  PaymentInformationSection,
  PaymentSection
} from "../Sections/PaymentSection"
import TestIcon from "@/assets/icons/snowboarder.svg"
import AccountSetupSection from "../Sections/AccountSetupSection"

export const PAGINATED_FORM_PAGES = (
  navigateFn: (route: RouteNames | "/profile" | number) => void,
  signUpFn: () => void,
  validateFormFn: (pageToValidate: PAGES, navigateFn: () => void) => void,
  disableSubmit: boolean,
  isSignedIn: boolean = false
): PageProps[] => [
  {
    index: PAGES.PersonalFirst,
    title: "Personal details",
    onNext: () => {
      validateFormFn(PAGES.PersonalFirst, () => navigateFn(PERSONAL_ROUTE_2))
    }
  },
  {
    index: PAGES.PersonalSecond,
    title: "Personal details",
    onBack: () => navigateFn(PERSONAL_ROUTE_1),
    onNext: () => {
      validateFormFn(PAGES.PersonalSecond, () => navigateFn(CONTACT_ROUTE))
    }
  },
  {
    index: PAGES.Contact,
    title: "Contact details",
    onBack: () => navigateFn(PERSONAL_ROUTE_2),
    onNext: () => {
      validateFormFn(PAGES.Contact, () => navigateFn(ADDITIONAL_ROUTE))
    }
  },
  {
    index: PAGES.Additional,
    title: "Additional info",
    nextButtonText: "Next",
    onBack: () => navigateFn(CONTACT_ROUTE),
    onNext: () =>
      validateFormFn(PAGES.Additional, () => navigateFn(CONFIRM_DETAILS_ROUTE))
  },

  {
    index: PAGES.ConfirmDetails,
    title: "Review Details",
    nextButtonText: "Sign Up",
    onBack: () => navigateFn(ADDITIONAL_ROUTE),
    onNext: () => {
      signUpFn()
    },
    nextDisabled: disableSubmit
  },
  {
    index: PAGES.PaymentInfo,
    title: "Payment Information",
    onNext: () => navigateFn(PAYMENT_ROUTE)
  },
  {
    index: PAGES.Payment,
    title: "Payment",
    nextButtonText: " ",
    onBack: () => navigateFn(PAYMENT_INFORMATION_ROUTE)
  },
  {
    index: PAGES.Confirm,
    title: "Confirm",
    onNext: () => navigateFn(ACCOUNT_SETUP_ROUTE),
    nextDisabled: !isSignedIn,
    backDisabled: !isSignedIn
  },
  {
    index: PAGES.AccountSetup,
    title: "Account",
    // goes back to one page earlier in history, otherwise does nothing
    onBack: () => navigateFn(-1)
  },
  {
    index: PAGES.Success,
    title: "Success",
    onBack: () => navigateFn(ACCOUNT_SETUP_ROUTE),
    onNext: () => navigateFn("/profile")
  }
]

/**
 * Make sure these are in order
 */
export const PAGE_CONTENT = [
  <PersonalSectionFirst key="personal-first" />,
  <PersonalSectionSecond key="personal-second" />,
  <ContactSection key="contact" />,
  <AdditionalSection key="additional" />,
  <ConfirmDetailsSection key="confirm-details" />,
  <PaymentInformationSection key="payment-info" />,
  <PaymentSection key="payment" />,
  <ConfirmationSection
    key="confirm"
    subHeader="Thank you!"
    textTop="Your application has been received, and you’ll be sent a confirmation email soon."
    textBottom="In the meantime, please set up your login details."
    SvgIcon={TestIcon}
  />,
  <AccountSetupSection key="account" />,
  <SuccessSection key="Success" />
]

/**
 * With the index, if each `step` has multiple stages we need to set the index of the step
 * to the first `page` of that `step`
 */
export const STEPPER_PROPS = [
  // Hacky solution, need to revisit props for stepper
  { name: "Personal", index: PAGES.PersonalFirst },
  { name: "Contact", index: PAGES.Contact },
  { name: "Additional", index: PAGES.Additional },
  { name: "Payment", index: PAGES.PaymentInfo },
  { name: "Confirm", index: PAGES.Confirm },
  { name: "Account", index: PAGES.AccountSetup }
]
