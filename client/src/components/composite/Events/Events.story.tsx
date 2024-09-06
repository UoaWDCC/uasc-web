import type { Meta, StoryObj } from "@storybook/react"
import EventsPage from "./Events"

const meta: Meta<typeof EventsPage> = {
  component: EventsPage
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultEventsPage: Story = {
  events: {},
  tags: ["autodocs"]
}
