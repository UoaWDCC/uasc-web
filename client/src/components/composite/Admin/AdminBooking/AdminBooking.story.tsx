import type { Meta, StoryObj } from "@storybook/react"
import AdminBooking from "./AdminBooking"

const meta: Meta<typeof AdminBooking> = {
  component: AdminBooking
}

export default meta
type Story = StoryObj<typeof meta>
export const DefaultAdminMemberView: Story = {
  args: {}
}
