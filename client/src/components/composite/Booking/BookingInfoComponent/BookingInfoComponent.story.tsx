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
    price1: "40",
    price2: "60",
    price3: "60"
  }
}
