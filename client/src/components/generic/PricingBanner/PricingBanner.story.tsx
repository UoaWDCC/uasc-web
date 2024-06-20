import type { Meta, StoryObj } from "@storybook/react"
import PricingBanner from "./PricingBanner"

const meta: Meta<typeof PricingBanner> = {
  component: PricingBanner
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    headline: "Great nightly rates",
    priceInformation: "$60 per night*",
    disclaimer: "*$50 when booking a single saturday"
  }
}
