import type { Meta, StoryObj } from "@storybook/react"
import TestIcon from "@/assets/icons/bell.svg"

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
    Icon: TestIcon
  }
}

export const BenefitCard2: Story = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    text: "Default Card Variant",
    Icon: TestIcon
  }
}
