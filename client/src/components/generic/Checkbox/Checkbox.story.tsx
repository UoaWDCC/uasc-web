import type { Meta, StoryObj } from "@storybook/react"

import Checkbox from "./Checkbox"
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  argTypes: {
    children: {
      name: "content"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  tags: ["autodocs"],
  args: {
    children: "Default",
    disabled: false
  }
}

export const Disabled: Story = {
  tags: ["autodocs"],
  args: {
    children: "Disabled",
    disabled: true
  }
}
