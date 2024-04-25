import type { Meta, StoryObj } from "@storybook/react"

import Checkbox from "./Checkbox"
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Checkbox",
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["unclicked", "clicked"]
    },
    children: {
      name: "content"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Checkbox1: Story = {
  tags: ["autodocs"],
  args: {
    children: "hi",
    variant: "clicked"
  }
}
