import type { Meta, StoryObj } from "@storybook/react"

import Tab from "./Tab"
import { BrowserRouter, NavLink } from "react-router-dom"

const meta: Meta<typeof Tab> = {
  component: Tab
}

export default meta
type Story = StoryObj<typeof Tab>

export const DefaultTab: Story = {
  args: {
    children: "Default Tab"
  }
}

export const DisabledTab: Story = {
  args: {
    children: "Disabled Tab",
    disabled: true
  }
}

export const TabWrappedInLink: Story = {
  args: {
    children: "Random Link"
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <NavLink to="">
          <Story />
        </NavLink>
      </BrowserRouter>
    )
  ]
}
