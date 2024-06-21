import type { Meta } from "@storybook/react"

import PricingSection from "./PricingSection"
import { pricingBannerContent, pricingNote } from "./utils/Pricing"
import { HomeProps } from "pages/Home/Home"

const meta: Meta<typeof PricingSection> = {
  component: PricingSection
}

export default meta

export const DefaultPricingSection = ({data}: HomeProps) => {
  return (
    <PricingSection
      pricings={data}
      note={pricingNote}
      bannerContent={pricingBannerContent}
    />
  )
}
