import type { Meta, StoryObj } from "@storybook/react"
import { BookingHistoryEvent } from "@/models/History"
import AdminBookingHistoryView from "./AdminBookingHistoryView"
import { Timestamp } from "firebase/firestore"
import { CombinedUserData } from "@/models/User"

const meta: Meta<typeof AdminBookingHistoryView> = {
  component: AdminBookingHistoryView
}

export default meta
type Story = StoryObj<typeof meta>

const bookingAdditionItem: BookingHistoryEvent = {
  event_type: "added_user_to_booking",
  timestamp: Timestamp.fromMillis(69),
  start_date: Timestamp.now(),
  end_date: Timestamp.now(),
  uid: "jack sun"
}

const bookingDeletionItem: BookingHistoryEvent = {
  event_type: "removed_user_from_booking",
  timestamp: Timestamp.fromMillis(69),
  start_date: Timestamp.now(),
  end_date: Timestamp.now(),
  uid: "stephen zhang"
}

const availabilityChangeItem: BookingHistoryEvent = {
  event_type: "changed_date_availability",
  timestamp: Timestamp.fromMillis(69),
  start_date: Timestamp.now(),
  end_date: Timestamp.now(),
  change: -32
}

const users: CombinedUserData[] = [
  {
    uid: "stephen zhang",
    first_name: "Stephen",
    last_name: "Zhang",
    dietary_requirements: "nothing",
    email: "love@gmail.com",
    phone_number: 696969,
    date_of_birth: Timestamp.now(),
    membership: "guest"
  },
  {
    uid: "jack sun",
    first_name: "Jack",
    last_name: "Sun",
    dietary_requirements: "nothing",
    email: "love@gmail.com",
    phone_number: 696969,
    date_of_birth: Timestamp.now(),
    membership: "guest"
  }
]

const mockDataArray: BookingHistoryEvent[] = []

for (let i = 0; i < 100; ++i) {
  mockDataArray.push(bookingAdditionItem)
  mockDataArray.push(bookingDeletionItem)
  mockDataArray.push(availabilityChangeItem)
}

export const DefaultAdminBookingHistoryView: Story = {
  args: {
    historyItems: mockDataArray,
    users
  }
}
