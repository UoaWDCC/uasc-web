import type { Meta, StoryObj } from "@storybook/react"

import ContactDetailPanel from "./ContactDetailPanel"

const meta: Meta<typeof ContactDetailPanel> = {
  component: ContactDetailPanel
}

export default meta

type Story = StoryObj<typeof ContactDetailPanel>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-2 p-4">
        <Story />
      </div>
    )
  ],
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
