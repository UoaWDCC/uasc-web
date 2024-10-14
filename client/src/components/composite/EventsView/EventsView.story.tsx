import type { Meta, StoryObj } from "@storybook/react"
import EventsPage from "./EventsView"
import { Timestamp } from "firebase/firestore"

const meta: Meta<typeof EventsPage> = {
  component: EventsPage
}
export default meta
type Story = StoryObj<typeof meta>

const earlierStartDate = Timestamp.fromDate(new Date(2023, 1, 1))
const startDate = Timestamp.fromDate(new Date(2024, 1, 1))

export const DefaultEventsPage: Story = {
  args: {
    rawEvents: [
      {
        id: "1",
        title: "UASC New event 1",
        location: "UASC",
        physical_start_date: earlierStartDate,
        sign_up_start_date: earlierStartDate,
        sign_up_end_date: earlierStartDate
      },
      {
        id: "2",
        title: "UASC New event 2",
        location: "UASC",
        physical_start_date: earlierStartDate,
        sign_up_start_date: startDate,
        sign_up_end_date: earlierStartDate
      },
      {
        id: "3",
        title: "UASC New Event 3",
        location: "UASC",
        physical_start_date: earlierStartDate,
        sign_up_start_date: startDate,
        sign_up_end_date: earlierStartDate
      }
    ]
  },
  tags: ["autodocs"]
}
