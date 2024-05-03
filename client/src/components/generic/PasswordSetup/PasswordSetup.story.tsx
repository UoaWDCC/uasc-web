import type { Meta, StoryObj } from "@storybook/react"
import { PasswordSetup } from "./PasswordSetup"

const meta: Meta<typeof PasswordSetup> = {
  component: PasswordSetup
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
