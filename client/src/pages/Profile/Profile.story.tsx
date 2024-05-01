import type { Meta, StoryObj } from "@storybook/react"

import Profile from "./Profile"
import { MemoryRouter } from "react-router-dom"

const meta: Meta<typeof Profile> = {
    component: Profile
}

export default meta
type Story = StoryObj<typeof Profile>

export const DefaultProfilePage: Story = {
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={[""]}>
                <Story />
            </MemoryRouter>
        )
    ]
}
