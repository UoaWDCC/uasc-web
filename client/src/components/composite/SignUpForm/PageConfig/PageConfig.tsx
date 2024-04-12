import { PageProps } from "components/generic/PaginatedForm/PaginatedForm"
import {
  PersonalSectionFirst,
  PersonalSectionSecond
} from "../Sections/PersonalSection"
import { ContactSection } from "../Sections/ContactSection"
import { AdditionalSection } from "../Sections/AdditionalSection"

export enum PAGES {
  PersonalFirst = 0,
  PersonalSecond,
  Contact,
  Additional
}

export const PAGINATED_FORM_PAGES = (
  setCurrentPage: (page: PAGES) => void
): PageProps[] => [
  {
    index: PAGES.PersonalFirst,
    title: "Personal details",
    onNext: () => setCurrentPage(PAGES.PersonalSecond)
  },
  {
    index: PAGES.PersonalSecond,
    title: "Personal details",
    onBack: () => setCurrentPage(PAGES.PersonalFirst),
    onNext: () => setCurrentPage(PAGES.Contact)
  },
  {
    index: PAGES.Contact,
    title: "Contact details",
    onBack: () => setCurrentPage(PAGES.PersonalSecond),
    onNext: () => setCurrentPage(PAGES.Additional)
  },
  {
    index: PAGES.Additional,
    title: "Additional info",
    onBack: () => setCurrentPage(PAGES.Contact)
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
  { name: "Payment", index: 69 },
  { name: "Confirm", index: 69 }
]
