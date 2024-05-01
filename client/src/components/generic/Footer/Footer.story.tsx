import type { Meta, StoryObj } from "@storybook/react"

import { Footer } from "./Footer"
import { MemoryRouter } from "react-router-dom"

const meta: Meta<typeof Footer> = {
  component: Footer
}

export default meta
type Story = StoryObj<typeof meta>
export const DefaultFooter: Story = {
  tags: ["autodocs"],
  args: {
    title: "Footer title testing",
    about: "ABOUT"
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}
