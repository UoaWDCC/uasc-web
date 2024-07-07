import type { Meta, StoryObj } from "@storybook/react"

import AdminAvailabilityView from "./AdminAvailabilityView"
import { DateSelectionProvider } from "./DateSelectionContext"
import { Timestamp } from "firebase/firestore"

const meta: Meta<typeof AdminAvailabilityView> = {
  component: AdminAvailabilityView
}

export default meta
type Story = StoryObj<typeof AdminAvailabilityView>

const mockBookings = []

for (let i = 0; i < 100; ++i) {
  mockBookings.push({
    id: "",
    availableSpaces: 42,
    maxBookings: 69,
    date: Timestamp.fromDate(new Date(Date.now() + 20000000 * i)), // random days
    description: ""
  })
}

export const DefaultAdminAvailabilityView: Story = {
  decorators: [
    (Story) => (
      <DateSelectionProvider>
        <Story />
      </DateSelectionProvider>
    )
  ],
  args: { slots: mockBookings }
}
