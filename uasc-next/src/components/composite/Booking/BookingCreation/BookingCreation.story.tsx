import type { Meta, StoryObj } from "@storybook/react"
import { CreateBookingSection } from "./BookingCreation"
import { MemoryRouter } from "react-router-dom"

const meta: Meta<typeof CreateBookingSection> = {
  component: CreateBookingSection
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultCreateBookingPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  args: {}
}
