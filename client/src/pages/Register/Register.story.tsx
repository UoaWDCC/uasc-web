import type { Meta, StoryObj } from "@storybook/react"

import Register from "./Register"
import { BrowserRouter } from "react-router-dom"

const meta: Meta<typeof Register> = {
  component: Register
}

export default meta
type Story = StoryObj<typeof Register>

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      )
    }
  ]
}
