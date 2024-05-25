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
import { useMembershipPaymentDetails } from "store/MembershipPayment"

type PaymentSectionProps = { wantsBankTransfer: (newState: boolean) => void }

const BankTransferSection = ({ wantsBankTransfer }: PaymentSectionProps) => {
  const navigate = useNavigate()
  const [{ currentUser }] = useAppData()
  const { data: prices } = useMembershipPricesQuery()
  const [{ membershipType }] = useMembershipPaymentDetails()
  const { data: userMembershipDetails } =
    useMembershipClientSecretQuery(membershipType)
  const { data } = useBankPaymentDetailsQuery()
  const requiredPrice = prices?.find(
    (price) => price.type === userMembershipDetails?.membershipType
  )
  /**
   * Use data fetched to find the correct price
   */

  return (
    <>
      {/* TODO: update instructions to highlight correct procedure */}
      <div className="text-h4">
        <ol className="flex list-outside list-decimal flex-col gap-4">
          <li className="">
            Transfer payment amount {requiredPrice?.title} to bank number:{" "}
            <h4 className="text-dark-blue-100 font-semibold">
              {data?.bankAccount}
            </h4>
          </li>
          <li>
            Send a screenshot of the transfer to
            <strong>{currentUser?.email || ""}</strong>{" "}
            <a
              className="text-light-blue-100 font-semibold"
              href={`mailto: ${data?.email}`}
            >
              {data?.email}
            </a>{" "}
            mentioning your name and email.
          </li>
        </ol>
      </div>

      <div className="flex w-[80%] flex-col gap-4 pt-4">
        <p className="text-gray-3">
          Note you will not be able to make any bookings until your payment has
          been confirmed by UASC.
        </p>
        <p className="text-gray-3">
          You will still have access to your account, and are able to set your
          login details as well as edit your personal information
        </p>
      </div>

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
  const [{ membershipType }] = useMembershipPaymentDetails()

  const { data, isLoading, isError } =
    useMembershipClientSecretQuery(membershipType)

  return (
    <>
      {data ? (
        <>
          {data.message && <p>{data.message}</p>}
          <PaymentForm
            onComplete={() => {}}
            clientSecret={data?.stripeClientSecret as string}
          />
        </>
      ) : null}
      <div className="flex flex-col">
        {/* TODO: add skeleton or fallback */}
        {isLoading && <h5>Loading</h5>}
        {isError && <h5>Error</h5>}
        {isError && membershipType === undefined && (
          <h5>
            You may have not selected a membership type. Click "Back" to double
            check.
          </h5>
        )}
      </div>

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
  const { data: prices } = useMembershipPricesQuery()
  const [{ membershipType }, { setMembershipType }] =
    useMembershipPaymentDetails()

  const { data: userMembershipDetails } =
    useMembershipClientSecretQuery(undefined)

  const existingMembershipType = userMembershipDetails?.membershipType

  if (existingMembershipType) {
    setMembershipType(existingMembershipType)
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex h-fit flex-col gap-2 md:-ml-16 md:flex-row">
          {prices ? (
            prices.map((price) => {
              if (existingMembershipType) {
                return (
                  <>
                    {price.type === existingMembershipType && (
                      <span
                        key={price.type}
                        className="w-full justify-self-center md:ml-16"
                      >
                        <PricingCard
                          title={price.title}
                          priceString={price.priceString}
                          selected={price.type === membershipType}
                          extraInfo={price.extraInfo}
                          discountedPriceString=""
                        />
                      </span>
                    )}
                  </>
                )
              }
              return (
                <>
                  <PricingCard
                    key={price.type}
                    title={price.title}
                    priceString={price.priceString}
                    selected={price.type === membershipType}
                    extraInfo={price.extraInfo}
                    discountedPriceString=""
                    onClick={() => setMembershipType(price.type)}
                  />
                </>
              )
            })
          ) : (
            <>
              {/* TODO: add skeleton or fallback */}
              <h5>Loading</h5>
            </>
          )}
        </div>
        {existingMembershipType ? (
          <h5>
            We are using the previously started membership type. You will get
            the chance to reselect 30 mins after you first started the checkout
            session
          </h5>
        ) : (
          <h5 className="font-bold uppercase">
            Please confirm your membership type before hitting Next, you will
            only be able to select a new one after 30 minutes
          </h5>
        )}
      </div>
    </>
  )
}
