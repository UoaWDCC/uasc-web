import {
  ACCOUNT_SETUP_ROUTE,
  ADDITIONAL_ROUTE,
  CONFIRM_DETAILS_ROUTE,
  CONFIRM_ROUTE,
  CONTACT_ROUTE,
  PAYMENT_INFORMATION_ROUTE,
  PAYMENT_ROUTE,
  PERSONAL_ROUTE_1,
  PERSONAL_ROUTE_2,
  SUCCESS_ROUTE
} from "@/components/composite/SignUpForm/utils/RouteNames"
import RegisterInner from "./RegisterInner"

export async function generateStaticParams() {
  return [
    PERSONAL_ROUTE_1,
    PERSONAL_ROUTE_2,
    CONTACT_ROUTE,
    ADDITIONAL_ROUTE,
    CONFIRM_DETAILS_ROUTE,
    PAYMENT_INFORMATION_ROUTE,
    PAYMENT_ROUTE,
    CONFIRM_ROUTE,
    ACCOUNT_SETUP_ROUTE,
    SUCCESS_ROUTE
  ].map((routeName) => {
    return { step: routeName }
  })
}

export default function Step({ params }: { params: { step: string } }) {
  return <RegisterInner step={params.step} />
}
