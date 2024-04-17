import type { Meta, StoryObj } from "@storybook/react"

import Dialog from "./ConfirmationDialog"
const meta: Meta<typeof Dialog> = {
  component: Dialog,
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

export const ConfirmationDialog: Story = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    title: "Successful!",
    text: "You can log in now"
  }
}
