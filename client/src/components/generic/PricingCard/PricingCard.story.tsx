import type { Meta, StoryObj } from "@storybook/react"
import PricingCard from "./PricingCard"
const meta: Meta<typeof PricingCard> = {
  component: PricingCard,
  title: "Pricing Card"
}

export default meta

type Story = StoryObj<typeof meta>

export const UnselectedPricingCard: Story = {
  args: {
    title: "UoA Student",
    priceString: "$45",
    extraInfo: "Special offer ends 17th March",
    selected: true
  }
}

export const SelectedPricingCard: Story = {
  args: {
    title: "UoA Student",
    priceString: "$45",
    extraInfo: "Special offer ends 17th March",
    selected: false
  }
}

export const SideBySidePricingCards: Story = {
  args: {
    title: "UoA Student",
    priceString: "$45",
    extraInfo: "Special offer ends 17th March"
  },
  decorators: [
    (Story) => (
      <div className="flex gap-3">
        <PricingCard
          title={"Selected Card"}
          priceString="$100"
          extraInfo="nothing"
          selected
        />
        <Story />
        <Story />
        <Story />
      </div>
    )
  ]
}
