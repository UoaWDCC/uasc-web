/* eslint-disable no-irregular-whitespace */
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
    title: "Outdoor Clubs Welcome Party",
    date: "THU 18/7 • 6pm",
    location: "Shadows Bar - 8 Alfred St, CBD, Auckland",
    content: `Get ready to kick off Re-O-Week with a bang!  Join us at Shadows Bar for the ultimate Outdoor Clubs Welcome Party, hosted by UoA Snowsports Club! Whether you're into hiking, biking, skiing, or just having a good time, this is the place to be!`
  }
}
