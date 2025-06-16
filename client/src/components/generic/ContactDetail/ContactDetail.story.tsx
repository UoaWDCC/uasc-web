import type { Meta, StoryObj } from "@storybook/react"

import ContactDetail from "./ContactDetail"

const meta: Meta<typeof ContactDetail> = {
  component: ContactDetail
}

export default meta

type Story = StoryObj<typeof ContactDetail>

export const Default: Story = {
  args: {
    title: "bookings",
    description: "for guest bookings, reservations etc",
    email: "bookings@gmail.com"
  }
}

export const WithLinks: Story = {
  args: {
    title: "Customer Support",
    description: "For any technical issues or questions",
    email: "support@example.com",
    links: [
      {
        url: "https://example.com/help",
        displayName: "Help Center"
      },
      {
        url: "https://example.com/faq",
        displayName: "FAQ"
      }
    ]
  }
}
