import type { Meta, StoryObj } from "@storybook/react"
// importing button.tsx as the object
import Button from "./FigmaButton"
const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button Variants",
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "alternative", "secondary"]
    },
    children: {
      name: "content"
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

/** Default button variant */
export const defaultButton: Story = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    children: "Default Button Variant"
  }
}

/** Alternative button variant */
export const alternativeButton: Story = {
  args: {
    variant: "alternative",
    children: "Alternative Button Variant"
  }
}

/** Secondary button variant */
export const secondaryButton: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button Variant"
  }
}

export const comparison: Story = {
  decorators: [
    () => {
      return (
        <>
          <button>test</button>
          <Button variant="default">test</Button>
          <button>test</button>
          <Button variant="alternative">test</Button>
          <button>test</button>
          <Button variant="secondary">test</Button>
        </>
      )
    }
  ]
}
