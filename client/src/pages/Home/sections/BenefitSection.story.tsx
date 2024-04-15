import type { Meta } from "@storybook/react"

import BenefitSection from "./BenefitSection"
import { benefits } from "./utils/Benefits"

const meta: Meta<typeof BenefitSection> = {
  component: BenefitSection
}

export default meta

export const DefaultPricingSection = () => {
  return <BenefitSection benefits={benefits} />
}
