import type { Meta, StoryObj } from "@storybook/react"
import NonLoggedInBookingsPage from "./NonLoggedInBookingsPage"

const meta: Meta<typeof NonLoggedInBookingsPage> = {
  component: NonLoggedInBookingsPage
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultCreateBookingPage: Story = {
  args: {}
}
