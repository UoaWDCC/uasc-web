// Example copied off https://storybook.js.org/docs/get-started/setup
import type { Meta, StoryObj } from "@storybook/react"

import Navbar from "./Navbar"

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Navbar> = {
  component: Navbar
}

export default meta
type Story = StoryObj<typeof Navbar>

export const FirstStory: Story = {
  args: {
    // 👇 The args you need here will depend on your component
  }
}
