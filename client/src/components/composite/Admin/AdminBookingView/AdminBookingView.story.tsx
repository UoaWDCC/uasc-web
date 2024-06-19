import type { Meta, StoryObj } from "@storybook/react"
import AdminBookingView, { BookingMemberColumnFormat } from "./AdminBookingView"

const meta: Meta<typeof AdminBookingView> = {
  component: AdminBookingView
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

export const DefaultAdminBookingView: Story = {
  args: {
    data: mockDataArray,
    dateRange: {
      startDate: new Date("6969-10-10"),
      endDate: new Date("9696-10-01")
    }
  }
}
