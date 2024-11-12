import type { Meta, StoryObj } from "@storybook/react"

import { AdminMemberView, MemberColumnFormat } from "./AdminMemberView"

const meta: Meta<typeof AdminMemberView> = {
  component: AdminMemberView
}

const mockData = {
  uid: "",
  Name: "john doe",
  Status: "member",
  Email: "test@gmail.com",
  "Date Joined": "27-10-2009"
}

const mockDataArray: MemberColumnFormat[] = []

for (let i = 0; i < 100; ++i) {
  mockDataArray.push(mockData)
}

export default meta
type Story = StoryObj<typeof meta>
export const DefaultAdminMemberView: Story = {
  args: {
    data: mockDataArray,
    handleResetMemberships() {
      alert("YOU WANT TO RESET???")
    }
  }
}
