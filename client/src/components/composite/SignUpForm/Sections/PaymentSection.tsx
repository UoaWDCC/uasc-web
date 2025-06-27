import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { PaymentForm } from "@/components/generic/PaymentComponent/PaymentForm"
import PricingCard from "@/components/generic/PricingCard/PricingCard"
import {
  useBankPaymentDetailsQuery,
  useMembershipPricesQuery
} from "@/services/AppData/AppDataQueries"
import { useMembershipClientSecretQuery } from "@/services/Payment/PaymentQueries"
import { useMembershipPaymentDetails } from "@/store/MembershipPayment"
import { useAppData } from "@/store/Store"
import { ACCOUNT_SETUP_ROUTE } from "../utils/RouteNames"
import {
  getMembershipTypeConfirmationMessage,
  oneLevelUp
} from "../utils/Utils"

type PaymentSectionProps = { wantsBankTransfer: (newState: boolean) => void }

const BankTransferSection = ({ wantsBankTransfer }: PaymentSectionProps) => {
  const router = useRouter()
  const { data: prices } = useMembershipPricesQuery()
  const [{ membershipType }] = useMembershipPaymentDetails()
  const { data: userMembershipDetails } =
    useMembershipClientSecretQuery(membershipType)
  const { data } = useBankPaymentDetailsQuery()
  const requiredPrice = prices?.find(
    (price) => price.name === userMembershipDetails?.membershipType
  )
  /**
   * Use data fetched to find the correct price
   */

  const CopyButton = ({ text }: { text?: string }) => {
    const handleOnclick = async () => {
      try {
        await navigator.clipboard.writeText(text!)
      } catch (error) {
        console.error((error as Error).message)
      }
    }
    return (
      <button
        type="button"
        onClick={handleOnclick}
        className="border-dark-blue-100 text-h5 text-dark-blue-100 hover:bg-dark-blue-100 rounded-md border px-8 py-1 font-bold uppercase hover:text-white"
      >
        copy
      </button>
    )
  }

  return (
    <>
      {/* TODO: update instructions to highlight correct procedure */}
      <div className="text-h4">
        <ol className="flex list-outside list-decimal flex-col gap-4 pl-4">
          <li className="">
            Transfer payment amount {requiredPrice?.title} to bank number:{" "}
            <h4 className="text-dark-blue-100 flex items-center font-semibold">
              {data?.bankAccount}{" "}
              <div className="pl-4">
                <CopyButton text={data?.bankAccount} />
              </div>
            </h4>
          </li>
          <li>
            Send a screenshot of the transfer to{" "}
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
        onClick={() => router.push(oneLevelUp(ACCOUNT_SETUP_ROUTE))}
      >
        Set up account in meantime
      </h5>
    </>
  )
}

const CardPaymentSection = ({ wantsBankTransfer }: PaymentSectionProps) => {
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
    </>
  )
}

export const PaymentSection = () => {
  const searchParams = useSearchParams()
  const [wantsBankTransfer, setWantsBankTransfer] = useState<boolean>(
    searchParams.get("bank") === "true"
  )

  const _setWantsBankTransfer = (state: boolean) => {
    // keep in URL so if user goes back can return to correct state
    setWantsBankTransfer(state)
  }
  return (
    <div className="flex h-full w-full flex-col gap-5 pb-4">
      {wantsBankTransfer ? (
        <BankTransferSection wantsBankTransfer={_setWantsBankTransfer} />
      ) : (
        <CardPaymentSection wantsBankTransfer={_setWantsBankTransfer} />
      )}
    </div>
  )
}

export const PaymentInformationSection = () => {
  const { data: prices } = useMembershipPricesQuery()
  const [{ membershipType }, { setMembershipType }] =
    useMembershipPaymentDetails()

  const { data: userMembershipDetails } =
    useMembershipClientSecretQuery(undefined)

  const [{ currentUser }] = useAppData()

  const existingMembershipType = userMembershipDetails?.membershipType

  if (existingMembershipType) {
    setMembershipType(existingMembershipType)
  }

  return (
    <div className="flex flex-col">
      <h5>
        <strong>Important</strong>
      </h5>
      <h5 className="mb-5 mt-1">
        You should have gotten a password reset email sent to{" "}
        <strong>{currentUser?.email}</strong>. If the email{" "}
        <strong>{currentUser?.email}</strong> is incorrect you should{" "}
        <strong>not</strong> proceed with payment and instead first update your
        email by going to{" "}
        <Link href="/profile">
          <strong className="text-light-blue-100">profile</strong>
        </Link>
      </h5>
      <div className="flex h-fit flex-col gap-1">
        {prices ? (
          prices.map((price) => {
            if (existingMembershipType) {
              return (
                <>
                  {price.name === existingMembershipType && (
                    <span
                      key={price.title}
                      className="w-full justify-self-center"
                    >
                      <PricingCard
                        title={price.title}
                        priceString={price.priceString}
                        selected={price.name === membershipType}
                        extraInfo={price.extraInfo}
                        discountedPriceString=""
                      />
                    </span>
                  )}
                </>
              )
            }
            return (
              <PricingCard
                key={price.title}
                title={price.title}
                priceString={price.priceString}
                selected={price.name === membershipType}
                extraInfo={price.extraInfo}
                discountedPriceString=""
                onClick={() => {
                  if (
                    confirm(getMembershipTypeConfirmationMessage(price.name))
                  ) {
                    setMembershipType(price.name)
                  }
                }}
              />
            )
          })
        ) : (
          <>
            {/* TODO: add skeleton or fallback */}
            <h5>Loading</h5>
          </>
        )}
      </div>
      <span className="my-3">
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
      </span>
    </div>
  )
}
