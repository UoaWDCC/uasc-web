// Example copied off https://storybook.js.org/docs/get-started/setup
import type { Meta, StoryObj } from "@storybook/react"

import SignUpForm from "./SignUpForm"
import { BrowserRouter } from "react-router-dom"

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm
}

export default meta
type Story = StoryObj<typeof SignUpForm>

export const FirstStory: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  args: {
    // 👇 The args you need here will depend on your component
  }
}
