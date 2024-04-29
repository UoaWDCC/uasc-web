import type { Meta, StoryObj } from "@storybook/react"

import SuccessSection from "./SuccessSection"

const meta: Meta<typeof SuccessSection> = {
  component: SuccessSection
}

export default meta
type Story = StoryObj<typeof meta>

export const SuccessSection1: Story = {
  tags: ["autodocs"],
  args: {}
}
