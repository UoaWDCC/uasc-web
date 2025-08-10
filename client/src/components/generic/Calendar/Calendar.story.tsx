import type { Meta, StoryObj } from "@storybook/react"
import CalendarComponent from "react-calendar"

const meta: Meta<typeof CalendarComponent> = {
  component: CalendarComponent,
  title: "Calendar"
}

export default meta

type Story = StoryObj<typeof meta>

export const Calendar: Story = {
  args: {}
}

export const SelectedDate: Story = {
  args: {
    value: new Date("2002-12-16")
  }
}

export const SelectedDateRange: Story = {
  args: {
    returnValue: "range",
    value: [new Date("2024-5-15"), new Date("2024-5-21")]
  }
}

export const NoWeekendBookings: Story = {
  args: {
    returnValue: "range",
    value: new Date("2002-12-16"),
    tileDisabled: ({ date }: { date: Date }) =>
      date.getDay() === 6 || date.getDay() === 0
  }
}
