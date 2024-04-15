import type { Meta } from "@storybook/react"

import PricingSection from "./PricingSection"

const meta: Meta<typeof PricingSection> = {
  component: PricingSection
}

export default meta

export const DefaultPricingSection = () => {
  return <PricingSection />
}
