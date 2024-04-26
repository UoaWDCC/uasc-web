import type { Meta, StoryObj } from "@storybook/react"
// importing button.tsx as the object
import Button from "./Button"
const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["v1", "v2", "signup", "small"]
    },
    children: {
      name: "content"
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

/** Button version 1, can be used under most situations */
export const v1: Story = {
  tags: ["autodocs"],
  args: {
    variant: "v1",
    children: "test v1 button"
  }
}

export const comparison: Story = {
  decorators: [
    () => {
      return (
        <>
          <button>test</button>
          <Button variant="v1">test</Button>
          <button>test</button>
          <Button variant="v2">test</Button>
          <button>test</button>
          <Button variant="signup">test</Button>
        </>
      )
    }
  ]
}
/** Button version 2, same as button version 1 */
export const v2: Story = {
  args: {
    variant: "v2",
    children: "test v2 button"
  }
}
/** Button for text expansion / yes or no selection */
export const small: Story = {
  args: {
    variant: "small",
    children: "test small button"
  }
}
/** Button used for signing up only */
export const signup: Story = {
  args: {
    variant: "signup",
    children: "test signup button"
  }
}
