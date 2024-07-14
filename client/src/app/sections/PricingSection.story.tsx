import type { Meta } from "@storybook/react"

import PricingSection from "./PricingSection"
import { pricingBannerContent, pricingNote } from "./utils/Pricing"
import { HomeProps } from "../HomeComponent"

const meta: Meta<typeof PricingSection> = {
  component: PricingSection
}

export default meta

export const DefaultPricingSection = ({ pricingData: data }: HomeProps) => {
  return (
    <PricingSection
      pricings={data}
      note={pricingNote}
      bannerContent={pricingBannerContent}
    />
  )
}
