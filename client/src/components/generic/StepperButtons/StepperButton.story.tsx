import type { Meta, StoryObj } from "@storybook/react"
// importing button.tsx as the object
import StepperButton from "./StepperButton"
const meta: Meta<typeof StepperButton> = {
  component: StepperButton,
  title: "Button",
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["normal"]
    },
    children: {
      name: "content"
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const normal: Story = {
  tags: ["autodocs"],
  args: {
    variant: "normal",
    children: "test"
  }
}
