import type { Meta, StoryObj } from "@storybook/react"
import AdminNavbar from "./AdminNavbar"

import { MemoryRouter } from "react-router-dom"

const meta: Meta<typeof AdminNavbar> = {
  component: AdminNavbar
}

export default meta
type Story = StoryObj<typeof meta>
export const DefaultAdminNavbar: Story = {
  tags: ["autodocs"],
  args: {
    title: "Admin Navbar"
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}
