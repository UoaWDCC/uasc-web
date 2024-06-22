import type { Meta, StoryObj } from "@storybook/react"

import Checkbox from "./Checkbox"
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  argTypes: {
    label: {
      name: "content"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  tags: ["autodocs"],
  args: {
    label: "Default",
    disabled: false
  }
}

export const Disabled: Story = {
  tags: ["autodocs"],
  args: {
    label: "Disabled",
    disabled: true
  }
}
