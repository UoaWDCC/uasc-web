import type { Meta, StoryObj } from "@storybook/react"

import FormContainer from "./FormContainer"

const meta: Meta<typeof FormContainer> = {
  component: FormContainer
}

export default meta

type Story = StoryObj<typeof FormContainer>

export const Default: Story = {
  args: {
    children: (
      <>
        <h1>Form Container</h1>
      </>
    )
  }
}
