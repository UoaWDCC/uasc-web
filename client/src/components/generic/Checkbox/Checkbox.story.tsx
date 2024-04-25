import type { Meta, StoryObj } from "@storybook/react"

import Checkbox from "./Checkbox"
const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Checkbox",
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "checked", "disabled"]
    },
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
    variant: "default",
    checked: false,
    disabled: false
  }
}
export const Checked: Story = {
  tags: ["autodocs"],
  args: {
    children: "Checked",
    variant: "checked",
    checked: true,
    disabled: false
  }
}

export const Disabled: Story = {
  tags: ["autodocs"],
  args: {
    children: "Disabled",
    variant: "disabled",
    checked: false,
    disabled: true
  }
}
