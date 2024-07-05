import type { Meta, StoryObj } from "@storybook/react"
import SuccessfulBooking from "./SuccessfulBooking"

const meta: Meta<typeof SuccessfulBooking> = {
  component: SuccessfulBooking
}

export default meta

type Story = StoryObj<typeof SuccessfulBooking>

export const defaultSuccessfulBooking: Story = {
  args: {
    startDate: "Monday, April 15th 2024",
    endDate: "Thursday, April 18th 2024"
  }
}
