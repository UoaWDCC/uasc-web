import type { Meta, StoryObj } from "@storybook/react"
// importing button.tsx as the object
import Button from "./MemberBenefitCard"
const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button Variants",
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "alternative", "secondary"]
    },
    children: {
      name: "content"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const BenefitCard1: Story = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    children: "Default Card Variant"
  }
}

export const BenefitCard2: Story = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    children: "Default Card Variant"
  }
}
