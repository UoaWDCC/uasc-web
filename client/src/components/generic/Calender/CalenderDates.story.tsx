import type { Meta, StoryObj } from "@storybook/react"

import CalenderDates from "./CalenderDates"

const meta: Meta<typeof CalenderDates> = {
  component: CalenderDates,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "booked", "selected", "other month"]
    },
    children: {
      name: "content"
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  tags: ["autodocs"],
  args: {
    title: "Calender Dates",
    variant: "default",
    children: "1" // default available calender date
  }
}
