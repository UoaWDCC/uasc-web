import React, { useState } from "react"
import { Meta, Story } from "@storybook/react"
import Dropdown from "./Dropdown"

const meta: Meta = {
  component: Dropdown,
  title: "Dropdown Component"
}

export default meta

type DropdownStoryProps = React.SelectHTMLAttributes<HTMLSelectElement>

const Template: Story<DropdownStoryProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<string>("")

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

export const DefaultDropdown: Story<DropdownStoryProps> = Template.bind({})
DefaultDropdown.args = {}
