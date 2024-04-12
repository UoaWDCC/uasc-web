import type { Meta, StoryObj } from "@storybook/react"
import { ConfirmSection } from "./ConfirmSection"
const meta: Meta<typeof ConfirmSection> = {
  component: ConfirmSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
