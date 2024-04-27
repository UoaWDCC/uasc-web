import { PaymentForm } from "components/generic/PaymentComponent/PaymentForm"
import PricingCard from "components/generic/PricingCard/PricingCard"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMembershipClientSecretQuery } from "services/Payment/PaymentQueries"
import { useAppData } from "store/store"
import { oneLevelUp } from "../utils/Utils"
import { ACCOUNT_SETUP } from "../utils/RouteNames"
import {
  useBankPaymentDetailsQuery,
  useMembershipPricesQuery
} from "services/AppData/AppDataQueries"

type PaymentSectionProps = { wantsBankTransfer: (newState: boolean) => void }

const BankTransferSection = ({ wantsBankTransfer }: PaymentSectionProps) => {
  const navigate = useNavigate()
  const [{ currentUser }] = useAppData()
  const { data } = useBankPaymentDetailsQuery()
  return (
    <>
      <p>
        Transfer $45 to the bank account {data?.bankAccount}, and send a
        screenshot of the transfer to {data?.email} metioning your name and
        email {currentUser?.email || ""}
      </p>
      <h5
        className="text-dark-blue-100  cursor-pointer uppercase"
        onClick={() => wantsBankTransfer(false)}
      >
        Pay with card instead
      </h5>
      <h5
        className="text-dark-blue-100  cursor-pointer uppercase"
        onClick={() => navigate(oneLevelUp(ACCOUNT_SETUP))}
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
  const [wantsBankTransfer, setWantsBankTransfer] = useState<boolean>(false)
  return (
    <>
      <div className="flex h-full w-full flex-col gap-5">
        {wantsBankTransfer ? (
          <BankTransferSection wantsBankTransfer={setWantsBankTransfer} />
        ) : (
          <CardPaymentSection wantsBankTransfer={setWantsBankTransfer} />
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
