import PaginatedForm from "components/generic/PaginatedForm/PaginatedForm"
import { useState } from "react"
import {
  PAGES,
  PAGE_CONTENT,
  PAGINATED_FORM_PAGES,
  STEPPER_PROPS
} from "./PageConfig/PageConfig"
import Stepper, {
  StepProps
} from "components/generic/StepperComponent/StepperComponent"

const SignUpForm = () => {
  const [currentPage, setCurrentPage] = useState<PAGES>(PAGES.PersonalFirst)

  const pages = PAGINATED_FORM_PAGES(setCurrentPage)
  const pageContent = PAGE_CONTENT
  const steps: StepProps[] = STEPPER_PROPS

  return (
    <div className="tranform-gpu relative flex justify-center">
      <span className="absolute -top-[17px] hidden lg:block">
        <Stepper steps={steps} currentStep={currentPage} />
      </span>
      <PaginatedForm pages={pages} currentPageIndex={currentPage}>
        <div className="h-24 ">{pageContent[currentPage]}</div>
      </PaginatedForm>
    </div>
  )
}

export default SignUpForm
