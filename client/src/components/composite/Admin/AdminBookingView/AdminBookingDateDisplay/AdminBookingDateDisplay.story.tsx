import type { Meta, StoryObj } from "@storybook/react"
import AdminBookingDateDisplay from "./AdminBookingDateDisplay"
import { Timestamp } from "firebase/firestore"
import {
  BookingInfo,
  IAdminBookingDate
} from "./AdminBookingDate/AdminBookingDate"

const meta: Meta<typeof AdminBookingDateDisplay> = {
  component: AdminBookingDateDisplay
}

export default meta
type Story = StoryObj<typeof meta>

const mockUser: BookingInfo = {
  bookingId: "2323",
  uid: "1",
  first_name: "Straight",
  last_name: "Zhao",
  date_of_birth: Timestamp.fromMillis(0),
  phone_number: 69696969,
  dietary_requirements: "nothing",
  email: "lasdl@gmail.com",
  membership: "guest"
}

const mockUsersArray: BookingInfo[] = []

for (let i = 0; i < 32; ++i) {
  mockUsersArray.push(mockUser)
}

const mockDatesArray: IAdminBookingDate[] = []

for (let i = 1; i < 30; ++i) {
  mockDatesArray.push({
    dateString: `${i}/10/2002`,
    users: mockUsersArray,
    handleUserDelete: () => {}
  })
}

export const DefaultAdminBookingDateDisplay: Story = {
  args: {
    dates: mockDatesArray
  }
}
