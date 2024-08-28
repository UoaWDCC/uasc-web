import type { Meta, StoryObj } from "@storybook/react"
import AdminBookingView from "./AdminBookingView"
import {
  BookingInfo,
  IAdminBookingDate
} from "./AdminBookingDateDisplay/AdminBookingDate/AdminBookingDate"
import { Timestamp } from "firebase/firestore"

const meta: Meta<typeof AdminBookingView> = {
  component: AdminBookingView
}

export default meta
type Story = StoryObj<typeof meta>

const mockUser: BookingInfo = {
  bookingId: "23132al",
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

export const DefaultAdminBookingView: Story = {
  args: {
    data: mockDatesArray,
    dateRange: {
      startDate: new Date("6969-10-10"),
      endDate: new Date("9696-10-01")
    }
  }
}
