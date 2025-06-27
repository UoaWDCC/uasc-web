import type { Meta, StoryObj } from "@storybook/react"

import MenuTab from "./MenuTab"

const meta: Meta<typeof MenuTab> = {
  component: MenuTab
}

export default meta
type Story = StoryObj<typeof MenuTab>

export const DefaultMenuTab: Story = {
  args: {
    displayText: "Default Tab",
    children: (
      <>
        <a href="https://google.com">item 1</a>
        <a href="https://google.com">item 2</a>
        <a href="https://google.com">item 3</a>
        <a href="https://google.com">item 4</a>
        <a href="https://google.com">item 5</a>
      </>
    )
  }
}

export const LongText: Story = {
  args: {
    displayText: "Default Tab",
    children: (
      <>
        <a href="https://google.com">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quae
          veritatis voluptas explicabo excepturi obcaecati sint quisquam
          voluptates impedit perspiciatis.
        </a>
        <a href="https://google.com">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quae
          veritatis voluptas explicabo excepturi obcaecati sint quisquam
          voluptates impedit perspiciatis.
        </a>
        <a href="https://google.com">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quae
          veritatis voluptas explicabo excepturi obcaecati sint quisquam
          voluptates impedit perspiciatis.
        </a>
        <a href="https://google.com">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quae
          veritatis voluptas explicabo excepturi obcaecati sint quisquam
          voluptates impedit perspiciatis.
        </a>
        <a href="https://google.com">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quae
          veritatis voluptas explicabo excepturi obcaecati sint quisquam
          voluptates impedit perspiciatis.
        </a>
      </>
    )
  }
}
