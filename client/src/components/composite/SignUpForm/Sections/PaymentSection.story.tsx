import type { Meta, StoryObj } from "@storybook/react"
import { PaymentSection } from "./PaymentSection"
const meta: Meta<typeof PaymentSection> = {
  component: PaymentSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
