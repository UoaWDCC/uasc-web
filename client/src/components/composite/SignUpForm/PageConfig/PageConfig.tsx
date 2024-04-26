import { PageProps } from "components/generic/PaginatedForm/PaginatedForm"
import {
  PersonalSectionFirst,
  PersonalSectionSecond
} from "../Sections/PersonalSection"
import { ContactSection } from "../Sections/ContactSection"
import { AdditionalSection } from "../Sections/AdditionalSection"
import {
  ADDITIONAL_ROUTE,
  CONFIRM_ROUTE,
  CONTACT_ROUTE,
  PAYMENT_INFORMATION_ROUTE,
  PAYMENT_ROUTE,
  PERSONAL_ROUTE_1,
  PERSONAL_ROUTE_2,
  RouteNames
} from "../utils/RouteNames"
import {
  PaymentInformationSection,
  PaymentSection
} from "../Sections/PaymentSection"
import ConfirmationSection from "../Sections/ConfirmationSection"
import TestIcon from "assets/icons/snowboarder.svg?react"
/**
 * Order of all these matters!
 */

export enum PAGES {
  PersonalFirst = 0,
  PersonalSecond,
  Contact,
  Additional,
  PaymentInfo,
  Payment,
  Confirm,
  Unknown
}

export const PAGINATED_FORM_PAGES = (
  navigateFn: (route: RouteNames) => void
): PageProps[] => [
  {
    index: PAGES.PersonalFirst,
    title: "Personal details",
    onNext: () => navigateFn(PERSONAL_ROUTE_2)
  },
  {
    index: PAGES.PersonalSecond,
    title: "Personal details",
    onBack: () => navigateFn(PERSONAL_ROUTE_1),
    onNext: () => navigateFn(CONTACT_ROUTE)
  },
  {
    index: PAGES.Contact,
    title: "Contact details",
    onBack: () => navigateFn(PERSONAL_ROUTE_2),
    onNext: () => navigateFn(ADDITIONAL_ROUTE)
  },
  {
    index: PAGES.Additional,
    title: "Additional info",
    nextButtonText: "Confirm",
    onBack: () => navigateFn(CONTACT_ROUTE),
    onNext: () => {
      throw new Error("not implemented")
    }
  },
  {
    index: PAGES.PaymentInfo,
    title: "Payment Information",
    onNext: () => navigateFn(PAYMENT_ROUTE)
  },
  {
    index: PAGES.Payment,
    title: "Payment",
    onBack: () => navigateFn(PAYMENT_INFORMATION_ROUTE),
    onNext: () => navigateFn(CONFIRM_ROUTE)
  },
  {
    index: PAGES.Confirm,
    title: "Confirm",
    onNext: () => {
      throw new Error("not implemented")
    }
  }
]

export const PAGE_CONTENT = [
  <PersonalSectionFirst key="personal-first" />,
  <PersonalSectionSecond key="personal-second" />,
  <ContactSection key="contact" />,
  <AdditionalSection key="additional" />,
  <PaymentInformationSection key="payment-info" />,
  <PaymentSection key="payment" />,
  <ConfirmationSection
    key="confirm"
    subHeader="Thank you!"
    textTop="Your application has been received, and you’ll be sent a confirmation email soon."
    textBottom="In the meantime, please set up your login details."
    SvgIcon={TestIcon}
  />
]

export const STEPPER_PROPS = [
  // Hacky solution, need to revisit props for stepper
  { name: "Personal", index: PAGES.PersonalFirst },
  { name: "Contact", index: PAGES.Contact },
  { name: "Additional", index: PAGES.Additional },
  { name: "Payment", index: PAGES.PaymentInfo },
  { name: "Confirm", index: PAGES.Confirm }
]
