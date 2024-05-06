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

export const defaultButtonInvertedSm: Story = {
  tags: ["autodocs"],
  args: {
    variant: "inverted-default-sm",
    children: "Default Button Variant Inverted Small"
  }
}

export const defaultButtonInvertedSt: Story = {
  tags: ["autodocs"],
  args: {
    variant: "inverted-default-st",
    children: "Default Button Variant Inverted Standard"
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

export const Undefault: Story = {
  args: {
    variant: "default",
    children: "Disabled default button",
    disabled: true
  }
}

export const Unalternative: Story = {
  args: {
    variant: "alternative",
    children: "Disabled alternative button",
    disabled: true
  }
}

export const Unsecondary: Story = {
  args: {
    variant: "secondary",
    children: "Disabled secondary button",
    disabled: true
  }
}

export const comparison: Story = {
  decorators: [
    () => {
      return (
        <div className="flex flex-col gap-3 ">
          <Button variant="default">test</Button>

          <Button variant="alternative">test</Button>

          <Button variant="secondary">test</Button>

          <Button variant="default" disabled>
            test
          </Button>

          <Button variant="alternative" disabled>
            test
          </Button>

          <Button variant="secondary" disabled>
            test
          </Button>
        </div>
      )
    }
  ]
}
