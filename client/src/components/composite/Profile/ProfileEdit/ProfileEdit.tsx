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
      return "First NameF"
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
  fields,
  onEdit
}: IProfileEdit<T>) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="">{title}</h3>
      <div className="w-full border border-black">
        {fields.map((field) => {
          return (
            <TextInput
              key={field.fieldName}
              label={nameTransformer(
                field.fieldName as keyof ReducedUserAdditionalInfo
              )}
            />
          )
        })}
      </div>
      <Button onClick={onEdit}>Update details</Button>
    </div>
  )
}

export default ProfileEdit
