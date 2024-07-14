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
