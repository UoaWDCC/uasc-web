import { PageProps } from "components/generic/PaginatedForm/PaginatedForm"
import {
  PersonalSectionFirst,
  PersonalSectionSecond
} from "../Sections/PersonalSection"
import { ContactSection } from "../Sections/ContactSection"
import { AdditionalSection } from "../Sections/AdditionalSection"
import { StepParam } from "../utils/Utils"

export enum PAGES {
  PersonalFirst = 0,
  PersonalSecond,
  Contact,
  Additional,
  Payment,
  Confirm,
  Unknown
}

export const PAGINATED_FORM_PAGES = (
  navigateFn: (route: StepParam) => void
): PageProps[] => [
  {
    index: PAGES.PersonalFirst,
    title: "Personal details",
    onNext: () => navigateFn("personal_2")
  },
  {
    index: PAGES.PersonalSecond,
    title: "Personal details",
    onBack: () => navigateFn("personal_1"),
    onNext: () => navigateFn("contact")
  },
  {
    index: PAGES.Contact,
    title: "Contact details",
    onBack: () => navigateFn("personal_2"),
    onNext: () => navigateFn("additional")
  },
  {
    index: PAGES.Additional,
    title: "Additional info",
    nextButtonText: "Confirm",
    onBack: () => navigateFn("contact"),
    onNext: () => {
      throw new Error("not implemented")
    }
  },
  {
    index: PAGES.Payment,
    title: "Payment",
    onNext: () => navigateFn("confirm")
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
  <AdditionalSection key="additional" />
]

export const STEPPER_PROPS = [
  // Hacky solution, need to revisit props for stepper
  { name: "Personal", index: PAGES.PersonalFirst },
  { name: "Contact", index: PAGES.Contact },
  { name: "Additional", index: PAGES.Additional },
  { name: "Payment", index: PAGES.Payment },
  { name: "Confirm", index: PAGES.Confirm }
]
