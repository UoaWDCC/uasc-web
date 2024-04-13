import type { Meta, StoryObj } from "@storybook/react"
import { AdditionalSection } from "./AdditionalSection"
const meta: Meta<typeof AdditionalSection> = {
  component: AdditionalSection
}

export default meta

type Story = StoryObj<typeof meta>

/** Button version 1, can be used under most situations */
export const Default: Story = {}
