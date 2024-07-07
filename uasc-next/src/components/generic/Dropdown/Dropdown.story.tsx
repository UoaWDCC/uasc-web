import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import Dropdown from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  component: Dropdown
}

export default meta

type Story = StoryObj<typeof meta>

type DropdownProps = React.SelectHTMLAttributes<HTMLSelectElement>

export const DefaultDropdown: Story = (args: DropdownProps) => {
  const [selectedValue, setSelectedValue] = React.useState<string>("")

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Dropdown {...args} value={selectedValue} onChange={handleChange}>
      <option key="placeholder" value="" disabled hidden>
        Dropdown
      </option>
      <option key="option1" value="option1">
        Option 1
      </option>
      <option key="option2" value="option2">
        Option 2
      </option>
      <option key="option3" value="option3">
        Option 3
      </option>
    </Dropdown>
  )
}

DefaultDropdown.args = {
  value: "defaultOption"
}
