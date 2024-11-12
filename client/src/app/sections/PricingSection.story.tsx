import type { Meta } from "@storybook/react"

import PricingSection from "./PricingSection"
import { HomeProps } from "../HomeComponent"

const meta: Meta<typeof PricingSection> = {
  component: PricingSection
}

export default meta

export const DefaultPricingSection = ({
  membershipPricingData: data
}: HomeProps) => {
  return (
    <PricingSection
      pricings={data}
      note={"THis is an optional disclaimer"}
      bannerContent={{
        priceInformation: "asdkjasdjkaslk",
        headline: "LOL STRAIGHT ZHAO"
      }}
    />
  )
}
