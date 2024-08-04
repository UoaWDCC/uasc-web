import type { Meta, StoryObj } from "@storybook/react"
import { BookingHistoryEvent } from "@/models/History"
import AdminBookingHistoryView from "./AdminBookingHistory"
import { Timestamp } from "firebase/firestore"

const meta: Meta<typeof AdminBookingHistoryView> = {
  component: AdminBookingHistoryView
}

export default meta
type Story = StoryObj<typeof meta>

const mockData: BookingHistoryEvent = {
  event_type: "added_user_to_booking",
  timestamp: Timestamp.fromMillis(69),
  start_date: Timestamp.now(),
  end_date: Timestamp.now(),
  uid: "69696969"
}

const mockDataArray: BookingHistoryEvent[] = []

for (let i = 0; i < 100; ++i) {
  mockDataArray.push(mockData)
}

export const DefaultAdminBookingHistoryView: Story = {
  args: {
    historyItems: mockDataArray
  }
}
