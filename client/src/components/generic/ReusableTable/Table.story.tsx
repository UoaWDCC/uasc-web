import type { Meta, StoryObj } from "@storybook/react"

import Table from "./Table"
import { useState } from "react"

const meta: Meta<typeof Table> = {
  component: Table
}

export default meta
type Story = StoryObj<typeof Table>

export const FullTable: Story = {
  decorators: [(Story) => <Story />],
  args: {
    onRowClick: (id) => console.log("table row clicked", id),
    data: [
      {
        uid: "John",
        Name: "John Doe",
        Email: "john.doe@example.com",
        Status: "Member",
        "Membership type": "UOA Student",
        "Date Joined": "12-7-22"
      },
      {
        uid: "Straight Zhao",
        Name: "Ray Zhao",
        Email: "ray.zhao@example.com",
        Status: "Superior Controller",
        "Membership type": "UOA Student",
        "Date Joined": "12-7-22"
      },
      {
        uid: "Doeshin",
        Name: "Johnathan Doeshin",
        Email: "jondoe@gmail.com",
        Status: "Member",
        "Membership type": "UOA Student",
        "Date Joined": "12-7-22"
      }
    ]
  }
}

export const MissingValues: Story = {
  decorators: [(Story) => <Story />],
  args: {
    data: [
      {
        uid: "",
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: 30,
        role: "Admin"
      },
      {
        uid: "",
        id: 2,
        firstName: "Jane",
        email: "jane.smith@example.com",
        gender: "Female",
        role: "User"
      }
    ]
  }
}

export const SingleOperation = () => {
  const data = [
    {
      uid: "1",
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 30,
      role: "Admin"
    },
    {
      uid: "2",
      id: 2,
      firstName: "Jane",
      email: "jane.smith@example.com",
      gender: "Female",
      role: "User"
    }
  ]
  const [message, setMessage] = useState("")
  return (
    <>
      <p>Last Clicked id: {message}</p>
      <Table<(typeof data)[0], "single-operation">
        data={data}
        operationType="single-operation"
        rowOperations={[
          {
            handler: (id: string) => {
              setMessage(id)
            }
          }
        ]}
      />
    </>
  )
}

export const MultipleOperations = () => {
  const data = [
    {
      uid: "1",
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      age: 30,
      role: "Admin"
    },
    {
      uid: "2",
      id: 2,
      firstName: "Jane",
      email: "jane.smith@example.com",
      gender: "Female",
      role: "User"
    }
  ]
  const [promoteMessage, setPromoteMessage] = useState("")
  const [deleteMessage, setDeleteMessage] = useState("")
  return (
    <>
      <p>Last promoted id: {promoteMessage}</p>
      <p>Last deleted id: {deleteMessage}</p>
      <Table<(typeof data)[0], "multiple-operations">
        data={data}
        onRowClick={() => alert("Row Callback")}
        operationType="multiple-operations"
        rowOperations={[
          {
            handler: (id: string) => {
              setPromoteMessage(id)
            },
            name: "promote"
          },

          {
            handler: (id: string) => {
              setDeleteMessage(id)
            },
            name: "delete"
          }
        ]}
      />
    </>
  )
}
