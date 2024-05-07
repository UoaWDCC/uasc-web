import type { Meta, StoryObj } from "@storybook/react"
import BookingInfoComponent from "./BookingInfoComponent"

const meta: Meta<typeof BookingInfoComponent> = {
  component: BookingInfoComponent
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultBookingInfoComponent: Story = {
  tags: ["autodocs"],
  args: {
    pricePerNight: "40",
    priceSaturday: "60",
    priceNonMember: "60"
  }
}
