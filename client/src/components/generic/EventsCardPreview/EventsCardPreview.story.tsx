import type { Meta, StoryObj } from "@storybook/react"

import EventsCardPreview from "./EventsCardPreview"
const meta: Meta<typeof EventsCardPreview> = {
  component: EventsCardPreview
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultEventsCardPreview: Story = {
  tags: ["autodocs"],
  args: {}
}
