import type { Meta, StoryObj } from "@storybook/react"
import { PersonalSectionFirst } from "./PersonalSection"
const meta: Meta<typeof PersonalSectionFirst> = {
  component: PersonalSectionFirst
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
