import type { Meta, StoryObj } from "@storybook/react"

import EventsCard from "./EventsCard"
const meta: Meta<typeof EventsCard> = {
  component: EventsCard
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultEventsCard: Story = {
  tags: ["autodocs"],
  args: {
    title: "Events Card Story",
    date: "THU 18/7 • 6pm",
    location: "Shadows Bar - 8 Alfred St, CBD, Auckland",
    content: "FUCK"
  }
}
