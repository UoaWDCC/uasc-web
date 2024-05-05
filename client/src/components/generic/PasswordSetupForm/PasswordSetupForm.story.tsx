import type { Meta, StoryObj } from "@storybook/react"
import { PasswordSetupForm } from "./PasswordSetupForm"

const meta: Meta<typeof PasswordSetupForm> = {
  component: PasswordSetupForm
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
