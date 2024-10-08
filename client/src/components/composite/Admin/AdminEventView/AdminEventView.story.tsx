import type { Meta, StoryObj } from "@storybook/react"

import AdminEventView from "./AdminEventView"

const meta: Meta<typeof AdminEventView> = {
  component: AdminEventView
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAdminEventView: Story = {
  args: {
    handleCreateEvent: () => {}
  }
}
