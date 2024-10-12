import type { Meta, StoryObj } from "@storybook/react"
import EventsPage from "./EventsView"

const meta: Meta<typeof EventsPage> = {
  component: EventsPage
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultEventsPage: Story = {
  args: {
    events: [
      {
        date: "sigma",
        title: "cock",
        location: "skibidi",
        content: "real",
        onClick: () => {}
      },
      {
        date: "f",
        title: "cock",
        location: "w",
        content: "gay",
        onClick: () => {}
      },
      {
        date: "f",
        title: "cock",
        location: "w",
        content: "ray",
        onClick: () => {}
      },
      {
        date: "f",
        title: "cock",
        location: "w",
        content: "league",
        onClick: () => {}
      }
    ]
  },
  tags: ["autodocs"]
}
