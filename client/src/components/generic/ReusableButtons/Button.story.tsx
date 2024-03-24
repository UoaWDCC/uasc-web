import type { Meta, StoryObj } from "@storybook/react"
// importing button.tsx as the object
import Button from "./Button"

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button"
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {}
}
