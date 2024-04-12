import { useParams } from "react-router-dom"
import { PAGES } from "../PageConfig/PageConfig"

export type StepParam =
  | "personal_1"
  | "personal_2"
  | "contact"
  | "additional"
  | "payment"
  | "confirm"

export const useCurrentStep = (): PAGES => {
  const { step } = useParams<{ step: StepParam }>()

  switch (step) {
    case "personal_1":
      return PAGES.PersonalFirst

    case "personal_2":
      return PAGES.PersonalSecond

    case "contact":
      return PAGES.Contact

    case "additional":
      return PAGES.Additional

    case "payment":
      return PAGES.Payment

    case "confirm":
      return PAGES.Confirm

    default:
      return PAGES.Unknown
  }
}
