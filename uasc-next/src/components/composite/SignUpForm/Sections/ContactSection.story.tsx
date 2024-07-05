import type { Meta, StoryObj } from "@storybook/react"
import { ContactSection } from "./ContactSection"
const meta: Meta<typeof ContactSection> = {
  component: ContactSection
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
