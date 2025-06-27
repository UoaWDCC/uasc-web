import type { Meta, StoryObj } from "@storybook/react"
import AdminBookingDate, { type BookingInfo } from "./AdminBookingDate"
import { Timestamp } from "firebase/firestore"

const meta: Meta<typeof AdminBookingDate> = {
  component: AdminBookingDate
}

export default meta
type Story = StoryObj<typeof meta>

const mockData: BookingInfo = {
  bookingId: "djs",
  uid: "1",
  first_name: "Straight",
  last_name: "Zhao",
  date_of_birth: Timestamp.fromMillis(0),
  phone_number: 69696969,
  dietary_requirements: "nothing",
  email: "lasdl@gmail.com",
  membership: "guest"
}

const mockDataArray: BookingInfo[] = []

for (let i = 0; i < 100; ++i) {
  mockDataArray.push(mockData)
}

export const DefaultAdminBookingDate: Story = {
  args: {
    dateString: "20/10/2024",
    users: mockDataArray
  }
}
