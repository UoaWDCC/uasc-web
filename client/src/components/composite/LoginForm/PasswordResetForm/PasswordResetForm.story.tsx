import type { Meta, StoryObj } from "@storybook/react"

import PasswordResetForm from "./PasswordResetForm"

const meta: Meta<typeof PasswordResetForm> = {
  component: PasswordResetForm
}

export default meta
type Story = StoryObj<typeof PasswordResetForm>

export const DefaultPasswordResetForm: Story = {}
