import type { Meta, StoryObj } from "@storybook/react"
import { SignUpNotif } from "./SignUpNotif"
import { MemoryRouter } from "react-router-dom"
const meta: Meta<typeof SignUpNotif> = {
  component: SignUpNotif
}
export default meta
type Story = StoryObj<typeof meta>

export const DefaultNotif: Story = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}
