import type { Meta, StoryObj } from "@storybook/react"
import { BookingHistoryEvent } from "@/models/History"
import { Timestamp } from "firebase/firestore"
import AdminBookingHistoryItem from "./AdminBookingHistoryItem"

const meta: Meta<typeof AdminBookingHistoryItem> = {
  component: AdminBookingHistoryItem
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

export const AdditionItem: Story = {
  args: {
    item: bookingAdditionItem,
    name: "stephen zhang"
  }
}

export const DeletionItem: Story = {
  args: {
    item: bookingDeletionItem,
    name: "Jack sun"
  }
}

export const AvailabilityChangeItem: Story = {
  args: {
    item: availabilityChangeItem
  }
}
