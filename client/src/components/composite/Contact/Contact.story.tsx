import type { Meta, StoryObj } from "@storybook/react"
import Contact from "./Contact"

const meta: Meta<typeof Contact> = {
  component: Contact
}

export default meta

type Story = StoryObj<typeof Contact>

export const Default: Story = {
  args: {
    items: [
      {
        title: "bookings",
        email: "bookings@gmail.com"
      },
      {
        title: "bookings",
        description: "for guest bookings, reservations etc",
        email: "bookings@gmail.com"
      },
      {
        title: "bookings",
        description: "for guest bookings, reservations etc",
        email: "bookings@gmail.com"
      }
    ]
  }
}
