import PaginatedForm, {
  PageProps
} from "components/generic/PaginatedForm/PaginatedForm"
import { STEPPER_PROPS } from "./PageConfig/PageConfig"
import Stepper from "components/generic/StepperComponent/StepperComponent"
import { oneLevelUp, useCurrentStep } from "./utils/Utils"
import { useAppData } from "store/Store"
import { Navigate } from "react-router-dom"
import {
  ACCOUNT_SETUP_ROUTE,
  PAGES,
  PAYMENT_INFORMATION_ROUTE,
  PERSONAL_ROUTE_1
} from "./utils/RouteNames"
import AlertsComponent from "components/generic/AlertsComponent/AlertsComponent"

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
}

export const ProtectedSignUpForm = ({
  pages,
  pageContent,
  alerts
}: Omit<ISignUpFormProps, "currentPage">) => {
  const [{ currentUser, currentUserClaims }] = useAppData()
  const currentPage = useCurrentStep()

  /**
   * Note that below our route is one level deeper than /register
   */

  switch (currentPage) {
    case PAGES.Unknown:
      return <Navigate to={oneLevelUp(PERSONAL_ROUTE_1)} replace />
    case PAGES.PersonalFirst:
    case PAGES.PersonalSecond:
    case PAGES.Contact:
    case PAGES.Additional:
      if (currentUser) {
        return <Navigate to={oneLevelUp(PAYMENT_INFORMATION_ROUTE)} replace />
      }
      break
    case PAGES.PaymentInfo:
    case PAGES.Payment:
      if (!currentUser) {
        return <Navigate to={oneLevelUp(PERSONAL_ROUTE_1)} replace />
      }

      // User has already paid for membership
      if (currentUserClaims?.member) {
        return <Navigate to={oneLevelUp(ACCOUNT_SETUP_ROUTE)} replace />
      }
      break
    case PAGES.Confirm:
      break
    case PAGES.AccountSetup:
      if (!currentUser) {
        return <Navigate to={oneLevelUp(PERSONAL_ROUTE_1)} replace />
      }
      break
    case PAGES.Success:
      break
  }
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
