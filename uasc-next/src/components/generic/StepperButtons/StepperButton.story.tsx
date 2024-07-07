import type { Meta, StoryObj } from "@storybook/react"
// importing button.tsx as the object
import StepperButton from "./StepperButton"
const meta: Meta<typeof StepperButton> = {
  component: StepperButton,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["normal", "disabled"]
    },
    children: {
      name: "content"
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const first: Story = {
  tags: ["autodocs"],
  args: {
    variant: "first",
    children: "confirm"
  }
}

export const normal: Story = {
  tags: ["autodocs"],
  args: {
    variant: "normal",
    children: "Additional"
  }
}

export const disabled: Story = {
  tags: ["autodocs"],
  args: {
    variant: "normal",
    children: "payment",
    disabled: true
  }
}
