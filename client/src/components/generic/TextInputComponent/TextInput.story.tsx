import type { Meta, StoryObj } from "@storybook/react"
import TextInputComponent from "./TextInput"

const meta: Meta<typeof TextInputComponent> = {
  component: TextInputComponent,
  title: "TextInput Component"
}

export default meta

type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "Placeholder"
  }
}

export const ErrorTextInput: Story = {
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "Error",
    error: true
  }
}

export const SuccessTextInput: Story = {
  tags: ["autodocs"],
  args: {
    type: "text",
    placeholder: "Success",
    success: true
  }
}
