"use client"

import PaginatedForm, {
  PageProps
} from "@/components/generic/PaginatedForm/PaginatedForm"
import { STEPPER_PROPS } from "./PageConfig/PageConfig"
import Stepper from "@/components/generic/StepperComponent/StepperComponent"
import { useCheckRegisterPermissions, useCurrentStep } from "./utils/Utils"
import { PAGES } from "./utils/RouteNames"
import AlertsComponent from "@/components/generic/AlertsComponent/AlertsComponent"

type Alerts = {
  message?: string
  errorMessage?: string
  successMessage?: string
}

interface ISignUpFormProps {
  currentPage: PAGES
  pages: PageProps[]
  pageContent: JSX.Element[]
  alerts?: Alerts
  step?: string
}

export const ProtectedSignUpForm = ({
  pages,
  pageContent,
  alerts,
  step
}: Omit<ISignUpFormProps, "currentPage">) => {
  const currentPage = useCurrentStep(step)
  useCheckRegisterPermissions(currentPage)

  return (
    <SignUpForm
      currentPage={currentPage}
      pageContent={pageContent}
      pages={pages}
      alerts={alerts}
    />
  )
}

const AlertComponents = ({ alerts }: { alerts?: Alerts }) => {
  if (alerts !== undefined) {
    const { errorMessage, message, successMessage } = alerts
    return (
      <span className="relative my-2">
        {errorMessage && (
          <AlertsComponent variant="error" message={errorMessage} />
        )}

        {message && (
          <AlertsComponent variant="notification" message={message} />
        )}
        {successMessage && (
          <AlertsComponent variant="success" message={successMessage} />
        )}
      </span>
    )
  }
  return null
}

export const SignUpForm = ({
  pages,
  currentPage,
  pageContent,
  alerts
}: ISignUpFormProps) => {
  const steps = STEPPER_PROPS

  return (
    <div className="relative flex justify-center">
      <span className="absolute -top-[17px] z-10 ml-4 hidden lg:block">
        <Stepper steps={steps} currentStep={currentPage} />
      </span>

      <PaginatedForm pages={pages} currentPageIndex={currentPage}>
        <div className="h-fit w-full">{pageContent[currentPage]}</div>
        <AlertComponents alerts={alerts} />
      </PaginatedForm>
    </div>
  )
}
