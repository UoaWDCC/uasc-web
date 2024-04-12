import PaginatedForm from "components/generic/PaginatedForm/PaginatedForm"
import { useState } from "react"
import {
  PAGES,
  PAGE_CONTENT,
  PAGINATED_FORM_PAGES,
  STEPPER_PROPS
} from "./PageConfig/PageConfig"
import Stepper from "components/generic/StepperComponent/StepperComponent"

const SignUpForm = () => {
  const [currentPage, setCurrentPage] = useState<PAGES>(PAGES.PersonalFirst)

  const pages = PAGINATED_FORM_PAGES(setCurrentPage)
  const pageContent = PAGE_CONTENT
  const steps = STEPPER_PROPS

  return (
    <div className="relative flex h-full justify-center">
      <span className="absolute -top-[17px] hidden lg:block">
        <Stepper steps={steps} currentStep={currentPage} />
      </span>
      <PaginatedForm pages={pages} currentPageIndex={currentPage}>
        <div className="h-36 min-h-[40vh] lg:min-h-[45vh]">
          {pageContent[currentPage]}
        </div>
      </PaginatedForm>
    </div>
  )
}

export default SignUpForm
