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
    title: "Default Calender Date",
    variant: "default",
    children: "1" // default available calender date
  }
}

export const Booked: Story = {
  tags: ["autodocs"],
  args: {
    title: "Booked / Disabled Calender Date",
    variant: "booked",
    children: "1" // booked / disabled unavailable calender date
  }
}

export const Selected: Story = {
  tags: ["autodocs"],
  args: {
    title: "Selected Calender Date",
    variant: "selected",
    children: "1" // selected calender date
  }
}

export const OtherMonth: Story = {
  tags: ["autodocs"],
  args: {
    title: "Other Month's Calender Date",
    variant: "other-month",
    children: "1" // calender dates for other months
  }
}
