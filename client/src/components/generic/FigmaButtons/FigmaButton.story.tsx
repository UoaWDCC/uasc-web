import type { Meta } from "@storybook/react"
// importing button.tsx as the object
import Button from "./FigmaButton"
const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {}
}

export default meta

/** Default button variant */
export const defaultButton = {
  tags: ["autodocs"],
  args: {
    variant: "default",
    children: "Default Button Variant"
  }
}

export const defaultButtonSm = {
  tags: ["autodocs"],
  args: {
    variant: "default-sm",
    children: "Default Button Variant Small"
  }
}

export const defaultButtonInvertedSm = {
  tags: ["autodocs"],
  args: {
    variant: "inverted-default-sm",
    children: "Default Button Variant Inverted Small"
  }
}

export const defaultButtonInvertedSt = {
  tags: ["autodocs"],
  args: {
    variant: "inverted-default-st",
    children: "Default Button Variant Inverted Standard"
  }
}

export const TertiaryButton = {
  tags: ["autodocs"],
  args: {
    variant: "tertiary",
    children: "Tertiary Button Variant"
  }
}

export const progressButtons = () => (
  <span className="flex items-center gap-2">
    <Button variant="progress-inverted">Back</Button>
    <Button variant="progress-default">Next</Button>
  </span>
)

/** Alternative button variant */
export const alternativeButton = {
  args: {
    variant: "alternative",
    children: "Alternative Button Variant"
  }
}

/** Secondary button variant */
export const secondaryButton = {
  args: {
    variant: "secondary",
    children: "Secondary Button Variant"
  }
}

export const Undefault = {
  args: {
    variant: "default",
    children: "Disabled default button",
    disabled: true
  }
}

export const Unalternative = {
  args: {
    variant: "alternative",
    children: "Disabled alternative button",
    disabled: true
  }
}

export const Unsecondary = {
  args: {
    variant: "secondary",
    children: "Disabled secondary button",
    disabled: true
  }
}

export const comparison = {
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
