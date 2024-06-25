import { ReducedUserAdditionalInfo } from "models/User"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"

interface IProfileEdit<T extends Partial<ReducedUserAdditionalInfo>> {
  title: string
  fields: {
    fieldName: keyof T
    defaultFieldValue: string
  }[]
  onEdit: (fields: Partial<T>) => void
}

const nameTransformer = (
  originalName: keyof ReducedUserAdditionalInfo
): string => {
  switch (originalName) {
    case "date_of_birth":
      return "Date of Birth"
    case "does_snowboarding":
      return "Does Snowboarding"
    case "does_racing":
      return "Does Racing"
    case "does_ski":
      return "Does Ski"
    case "phone_number":
      return "Phone Number"
    case "gender":
      return "Gender"
    case "emergency_contact":
      return "Emergency Contact"
    case "first_name":
      return "First Name"
    case "last_name":
      return "Last Name"
    case "dietary_requirements":
      return "Dietary Requirements"
    case "ethnicity":
      return "Ethnicity"
    case "faculty":
      return "Faculty"
    case "university":
      return "University"
    case "student_id":
      return "Student Id"
    case "university_year":
      return "University Year"
  }
}

const ProfileEdit = <T extends Partial<ReducedUserAdditionalInfo>>({
  title,
  fields
}: IProfileEdit<T>) => {
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <div className="border-gray-3 mt-4 flex w-full  flex-col gap-4 rounded-md border p-4">
        <h3 className="text-dark-blue-100">{title}</h3>
        {fields.map((field) => {
          return (
            <TextInput
              key={field.fieldName.toString()}
              label={nameTransformer(
                field.fieldName as keyof ReducedUserAdditionalInfo
              )}
            />
          )
        })}
      </div>
      <Button onClick={() => {}}>Update details</Button>
    </div>
  )
}

export default ProfileEdit
