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
    children: "default",
    variant: "default"
  }
}
export const Checked: Story = {
  tags: ["autodocs"],
  args: {
    children: "checked",
    variant: "checked"
  }
}

export const Disabled: Story = {
  tags: ["autodocs"],
  args: {
    children: "disabled",
    variant: "disabled"
  }
}
