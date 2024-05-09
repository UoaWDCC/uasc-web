import { PaymentForm } from "components/generic/PaymentComponent/PaymentForm"
import PricingCard from "components/generic/PricingCard/PricingCard"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useMembershipClientSecretQuery } from "services/Payment/PaymentQueries"
import { useAppData } from "store/Store"
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
  const { data: prices } = useMembershipPricesQuery()
  const { data } = useBankPaymentDetailsQuery()
  const { data: userMembershipDetails } = useMembershipClientSecretQuery()

  /**
   * Use data fetched to find the correct price
   */
  const requiredPrice = prices?.find(
    (price) => price.type === userMembershipDetails?.membershipType
  )

  return (
    <>
      <h4 className="font-bold">How to pay through bank</h4>
      {/* TODO: update instructions to highlight correct procedure */}
      <p>
        Transfer <strong>{requiredPrice?.priceString}</strong> (price for{" "}
        {requiredPrice?.title}) to the bank account{" "}
        <strong>{data?.bankAccount}</strong>, and send a screenshot of the
        transfer to{" "}
        <a
          className="text-light-blue-100 font-bold"
          href={`mailto: ${data?.email}`}
        >
          {data?.email}
        </a>{" "}
        mentioning your name and email{" "}
        <strong>{currentUser?.email || ""}</strong>
      </p>

      <p>
        Note you will not be able to make any bookings until your payment has
        been confirmed by UASC.
      </p>
      <p>
        You will still have access to your account, and are able to set your
        login details as well as edit your personal information
      </p>
      <h4 className="font-bold">Click on an action</h4>
      <h5
        className="text-dark-blue-100  cursor-pointer font-bold uppercase"
        onClick={() => wantsBankTransfer(false)}
      >
        Pay with card instead
      </h5>
      <h5
        className="text-dark-blue-100  cursor-pointer font-bold uppercase"
        onClick={() => navigate(oneLevelUp(ACCOUNT_SETUP_ROUTE))}
      >
        Set up account in meantime
      </h5>
    </>
  )
}

const CardPaymentSection = ({ wantsBankTransfer }: PaymentSectionProps) => {
  const navigate = useNavigate()
  const { data, error } = useMembershipClientSecretQuery()
  return (
    <>
      {error && <p>{error.message}</p>}
      {data ? (
        <>
          {data.message && <p>{data.message}</p>}
          <PaymentForm
            onComplete={() => {}}
            clientSecret={data?.stripeClientSecret as string}
          />
        </>
      ) : (
        <>
          {/* TODO: add skeleton or fallback */}
          Loading
        </>
      )}
      <h5
        className="text-dark-blue-100 mb-2 cursor-pointer font-bold uppercase"
        onClick={() => wantsBankTransfer(true)}
      >
        Can’t pay through card? Bank Transfer instead
      </h5>

      <h5
        className="text-dark-blue-100  cursor-pointer font-bold uppercase"
        onClick={() => navigate(oneLevelUp(ACCOUNT_SETUP_ROUTE))}
      >
        set up account (pay later)
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
      <div className="flex h-full w-full flex-col gap-5 pb-4">
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
        {prices ? (
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
          })
        ) : (
          <>
            {/* TODO: add skeleton or fallback */}
            Loading
          </>
        )}
      </div>
    </>
  )
}
