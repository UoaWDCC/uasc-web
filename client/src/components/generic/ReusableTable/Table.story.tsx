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
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: 30,
        gender: "Male",
        role: "Admin"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        age: 25,
        gender: "Female",
        role: "User"
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
