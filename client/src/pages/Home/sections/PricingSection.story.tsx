import type { Meta } from "@storybook/react"

import PricingSection from "./PricingSection"
import { Pricings, pricingBannerContent, pricingNote } from "./utils/Pricing"

const meta: Meta<typeof PricingSection> = {
  component: PricingSection
}

export default meta

export const DefaultPricingSection = () => {
  return (
    <PricingSection
      pricings={Pricings}
      note={pricingNote}
      bannerContent={pricingBannerContent}
    />
  )
}
