import type { Meta, StoryObj } from "@storybook/react"

import { PageTitle } from "./PageTitle"
const meta: Meta<typeof PageTitle> = {
  component: PageTitle
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultPageTitle: Story = {
  tags: ["autodocs"],
  args: {
    title: "testing page title"
  }
}
