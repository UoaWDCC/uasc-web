import type { Meta, StoryObj } from "@storybook/react"
import PricingCard from "./PricingCard"
const meta: Meta<typeof PricingCard> = {
  component: PricingCard
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

export const HomePricingCardWithDiscount: Story = {
  args: {
    variant: "home",
    discountedPriceString: "$45",
    title: "UoA Student",
    priceString: "$65",
    extraInfo: "Save $20",
    selected: false
  }
}

export const HomePricingCardWithoutDiscount: Story = {
  args: {
    variant: "home",
    title: "UoA Student",
    discountedPriceString: "$65",
    selected: false
  }
}

export const SideBySideHomePricingCard: Story = {
  args: {
    variant: "home",
    discountedPriceString: "$45",
    title: "UoA Student",
    priceString: "$65",
    extraInfo: "Save $20",
    selected: false
  },
  decorators: [
    (Story) => (
      <div className="flex gap-3">
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    )
  ]
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
          discountedPriceString=""
          variant="default"
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
