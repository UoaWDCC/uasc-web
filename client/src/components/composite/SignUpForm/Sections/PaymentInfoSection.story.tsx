import type { Meta, StoryObj } from "@storybook/react"
import { PaymentInformationSection } from "./PaymentSection"
const meta: Meta<typeof PaymentInformationSection> = {
  component: PaymentInformationSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
