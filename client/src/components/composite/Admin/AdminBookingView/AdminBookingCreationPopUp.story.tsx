import type { Meta, StoryObj } from "@storybook/react"
import AdminBookingCreationPopUp from "./AdminBookingCreationPopUp"
const meta: Meta<typeof AdminBookingCreationPopUp> = {
  component: AdminBookingCreationPopUp
}

export default meta
type Story = StoryObj<typeof AdminBookingCreationPopUp>

export const AdminBookingCreationPopUp1: Story = {
  args: {}
}
