import type { Meta, StoryObj } from "@storybook/react"
import AdminEventForm from "./AdminEventForm"

const meta: Meta<typeof AdminEventForm> = {
  component: AdminEventForm
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAdminEventForm: Story = {}
