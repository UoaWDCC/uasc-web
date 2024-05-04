import type { Meta, StoryObj } from "@storybook/react"
import AccountSetupSection from "./AccountSetupSection"

const meta: Meta<typeof AccountSetupSection> = {
  component: AccountSetupSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
