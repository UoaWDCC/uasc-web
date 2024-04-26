import { PaymentForm } from "components/generic/PaymentComponent/PaymentForm"
import PricingCard from "components/generic/PricingCard/PricingCard"
import { MembershipTypes } from "models/Payment"
import { useMembershipClientSecretQuery } from "services/Payment/PaymentQueries"

export const PaymentSection = () => {
  const { data, error } = useMembershipClientSecretQuery()
  return (
    <>
      <div className="h-full w-full">
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
          <>Error</>
        )}
      </div>
    </>
  )
}

// TODO: Dynamically fetch
const prices: {
  title: string
  type: MembershipTypes
  priceString: string
  extraInfo: string
}[] = [
  {
    title: "UoA New",
    type: "uoa_new",
    priceString: "$45",
    extraInfo: "Special offer ends 17th March"
  },
  {
    title: "UoA Returning",
    type: "uoa_returning",
    priceString: "$45",
    extraInfo: "Special offer ends 17th March"
  },
  {
    title: "Other uni returning",
    type: "other_returning",
    priceString: "$45",
    extraInfo: "Special offer ends 17th March"
  },
  {
    title: "Other uni new",
    type: "other_new",
    priceString: "$45",
    extraInfo: "Special offer ends 17th March"
  }
]

export const PaymentInformationSection = () => {
  const { data } = useMembershipClientSecretQuery()
  return (
    <>
      {data ? (
        <div className="flex h-fit flex-col gap-2 md:-ml-16 md:flex-row">
          {prices.map((price) => {
            return (
              <PricingCard
                key={price.type}
                title={price.title}
                priceString={price.priceString}
                selected={price.type === "uoa_new"}
                extraInfo={price.extraInfo}
                discountedPriceString=""
              />
            )
          })}
        </div>
      ) : null}
    </>
  )
}
