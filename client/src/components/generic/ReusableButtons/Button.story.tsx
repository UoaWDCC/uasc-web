import type { Meta, StoryObj } from "@storybook/react"
// importing button.tsx as the object
import Button from "./Button"

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button"
}

export default meta

type Story = StoryObj<typeof meta>

export const v1: Story = {
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

export const v2: Story = {
  args: {
    variant: "v2",
    children: "test v2 button"
  }
}

export const small: Story = {
  args: {
    variant: "small",
    children: "test small button"
  }
}

export const signup: Story = {
  args: {
    variant: "signup",
    children: "test signup button"
  }
}
