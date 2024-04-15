import type { Meta } from "@storybook/react"

import BenefitSection from "./BenefitSection"

const meta: Meta<typeof BenefitSection> = {
  component: BenefitSection
}

export default meta

export const DefaultBenefitSection = () => {
  return <BenefitSection />
}
