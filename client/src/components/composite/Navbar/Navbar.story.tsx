// Example copied off https://storybook.js.org/docs/get-started/setup
import type { Meta, StoryObj } from "@storybook/react"
import { BrowserRouter } from "react-router-dom"

import Navbar from "./Navbar"

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Navbar> = {
  component: Navbar
}

export default meta
type Story = StoryObj<typeof Navbar>

export const LoggedInNavbar: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  args: {
    isLoggedIn: true
  }
}

export const LoggedOutNavbar: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  args: {
    isLoggedIn: false
  }
}
