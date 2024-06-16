import type { Meta, StoryObj } from "@storybook/react"
import AdminBooking, { BookingMemberColumnFormat } from "./AdminBookingView"

const meta: Meta<typeof AdminBooking> = {
  component: AdminBooking
}

export default meta
type Story = StoryObj<typeof meta>

const mockData: BookingMemberColumnFormat = {
  uid: "1",
  Date: "04/06/2004",
  Name: "Ray",
  Number: "12345678",
  Email: "Ray1111@gmail.com",
  "Dietary Requirement": "none"
}

const mockDataArray: BookingMemberColumnFormat[] = []

for (let i = 0; i < 100; ++i) {
  mockDataArray.push(mockData)
}

export const DefaultAdminMemberView: Story = {
  args: { data: mockDataArray }
}
