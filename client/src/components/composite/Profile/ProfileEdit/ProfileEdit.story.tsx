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
      date_of_birth: { seconds: number; nanoseconds: number }
      faculty: string
      phone_number: number
      emergency_contact: string
      student_id: string
    }>
      title="Update personal details"
      fields={[
        { fieldName: "first_name", defaultFieldValue: "ray" },
        { fieldName: "last_name", defaultFieldValue: "cho" },
        // { fieldName: "date_of_birth", defaultFieldValue: "2004/06/09" },
        { fieldName: "faculty", defaultFieldValue: "unemployed freeloader" },
        { fieldName: "phone_number", defaultFieldValue: "6969696" },
        { fieldName: "emergency_contact", defaultFieldValue: "no one" },
        { fieldName: "student_id", defaultFieldValue: "111" }
      ]}
      onEdit={() => {}}
      onClose={() => {}}
    />
  )
}
