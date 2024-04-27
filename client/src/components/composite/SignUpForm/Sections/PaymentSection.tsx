import { PaymentForm } from "components/generic/PaymentComponent/PaymentForm"
import PricingCard from "components/generic/PricingCard/PricingCard"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMembershipClientSecretQuery } from "services/Payment/PaymentQueries"
import { useAppData } from "store/store"
import { oneLevelUp } from "../utils/Utils"
import {
  useBankPaymentDetailsQuery,
  useMembershipPricesQuery
} from "services/AppData/AppDataQueries"
import { ACCOUNT_SETUP_ROUTE } from "../utils/RouteNames"

type PaymentSectionProps = { wantsBankTransfer: (newState: boolean) => void }

const BankTransferSection = ({ wantsBankTransfer }: PaymentSectionProps) => {
  const navigate = useNavigate()
  const [{ currentUser }] = useAppData()
  const { data } = useBankPaymentDetailsQuery()
  return (
    <>
      <p>
        Transfer $45 to the bank account <strong>{data?.bankAccount}</strong>,
        and send a screenshot of the transfer to <strong>{data?.email}</strong>{" "}
        mentioning your name and email{" "}
        <strong>{currentUser?.email || ""}</strong>
      </p>
      <h5
        className="text-dark-blue-100  cursor-pointer uppercase"
        onClick={() => wantsBankTransfer(false)}
      >
        Pay with card instead
      </h5>
      <h5
        className="text-dark-blue-100  cursor-pointer uppercase"
        onClick={() => navigate(oneLevelUp(ACCOUNT_SETUP_ROUTE))}
      >
        Set up account in meantime
      </h5>
    </>
  )
}

const CardPaymentSection = ({ wantsBankTransfer }: PaymentSectionProps) => {
  const { data, error } = useMembershipClientSecretQuery()
  return (
    <>
      {data ? (
        <>
          {error && <p>{error.message}</p>}
          {data.message && <p>{data.message}</p>}
          <PaymentForm
            onComplete={() => {}}
            clientSecret={data?.stripeClientSecret as string}
          />
        </>
      ) : (
        <>Loading</>
      )}
      <h5
        className="text-dark-blue-100 cursor-pointer uppercase"
        onClick={() => wantsBankTransfer(true)}
      >
        Can’t pay through card? Bank Transfer instead
      </h5>
    </>
  )
}

export const PaymentSection = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [wantsBankTransfer, setWantsBankTransfer] = useState<boolean>(
    searchParams.get("bank") === "true"
  )
  const _setWantsBankTransfer = (state: boolean) => {
    // keep in URL so if user goes back can return to correct state
    setSearchParams({ bank: `${state}` })
    setWantsBankTransfer(state)
  }
  return (
    <>
      <div className="flex h-full w-full flex-col gap-5">
        {wantsBankTransfer ? (
          <BankTransferSection wantsBankTransfer={_setWantsBankTransfer} />
        ) : (
          <CardPaymentSection wantsBankTransfer={_setWantsBankTransfer} />
        )}
      </div>
    </>
  )
}

export const PaymentInformationSection = () => {
  const { data } = useMembershipClientSecretQuery()
  const { data: prices } = useMembershipPricesQuery()
  return (
    <>
      <div className="flex h-fit flex-col gap-2 md:-ml-16 md:flex-row">
        {prices &&
          prices.map((price) => {
            return (
              <PricingCard
                key={price.type}
                title={price.title}
                priceString={price.priceString}
                selected={data && price.type === data.membershipType}
                extraInfo={price.extraInfo}
                discountedPriceString=""
              />
            )
          })}
      </div>
    </>
  )
}
