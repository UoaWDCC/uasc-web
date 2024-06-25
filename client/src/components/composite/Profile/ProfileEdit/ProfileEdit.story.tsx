import type { Meta } from "@storybook/react"
import ProfileEdit from "./ProfileEdit"

const meta: Meta<typeof ProfileEdit> = {
  component: ProfileEdit
}

export default meta

export const DefaultProfileEdit = () => {
  return (
    <ProfileEdit<{
      first_name: string
      last_name: string
      phone_number: number
    }>
      title="Update Personal Details"
      fields={[
        { fieldName: "first_name", defaultFieldValue: "ray" },
        { fieldName: "last_name", defaultFieldValue: "cho" },
        { fieldName: "phone_number", defaultFieldValue: "6969696" }
      ]}
      onEdit={() => {}}
    />
  )
}
