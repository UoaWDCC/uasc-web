import type { Meta, StoryObj } from "@storybook/react"
import Input from "./Input"

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input Component"
}

export default meta

type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "default"
  }
}

export const RequiredTextInput: Story = {
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "default",
    required: true
  }
}
