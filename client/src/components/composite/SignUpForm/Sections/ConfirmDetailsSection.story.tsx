import type { Meta, StoryObj } from "@storybook/react"
import { ConfirmDetailsSection } from "./ConfirmDetailsSection"
const meta: Meta<typeof ConfirmDetailsSection> = {
  component: ConfirmDetailsSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
