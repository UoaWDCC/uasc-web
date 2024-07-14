import type { Meta, StoryObj } from "@storybook/react"

import Card from "./MemberBenefitCard"
const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default"]
    },
    text: {
      name: "text for description"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const BenefitCard1: Story = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    text: "Book our cozy ski lodge on the Whakapapa skifield",
    imageSrc: "public/images/AboutBackgroundImage.png"
  }
}

export const BenefitCard2: Story = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    text: "Default Card Variant",
    imageSrc: "public/images/AboutBackgroundImage.png"
  }
}
