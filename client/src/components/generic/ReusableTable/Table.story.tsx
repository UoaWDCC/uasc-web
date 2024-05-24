import type { Meta, StoryObj } from "@storybook/react"

import Table from "./Table"

const meta: Meta<typeof Table> = {
  component: Table
}

export default meta
type Story = StoryObj<typeof Table>

export const FullTable: Story = {
  decorators: [(Story) => <Story />],
  args: {
    data: [
      {
        Name: "John Doe",
        Email: "john.doe@example.com",
        Status: "Member",
        "Membership type": "UOA Student",
        "Date Joined": "12-7-22"
      },
      {
        Name: "Ray Zhao",
        Email: "ray.zhao@example.com",
        Status: "Superior Controller",
        "Membership type": "UOA Student",
        "Date Joined": "12-7-22"
      },
      {
        Name: "Johnathan Doeshin",
        Email: "jondoe@gmail.com",
        Status: "Member",
        "Membership type": "UOA Student",
        "Date Joined": "12-7-22"
      }
    ]
  }
}

export const MissingValues: Story = {
  decorators: [(Story) => <Story />],
  args: {
    data: [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: 30,
        role: "Admin"
      },
      {
        id: 2,
        firstName: "Jane",
        email: "jane.smith@example.com",
        gender: "Female",
        role: "User"
      }
    ]
  }
}
