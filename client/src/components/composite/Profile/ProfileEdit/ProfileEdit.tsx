import { ReducedUserAdditionalInfo } from "models/User"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import CloseButton from "assets/icons/x.svg?react"

interface IProfileEdit<T extends Partial<ReducedUserAdditionalInfo>> {
  title: string
  onClose: () => void
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
      return "Mobile number"
    case "gender":
      return "Gender"
    case "emergency_contact":
      return "Emergency contact info"
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
      return "UoA Student ID Number"
    case "university_year":
      return "University Year"
  }
}

const ProfileEdit = <T extends Partial<ReducedUserAdditionalInfo>>({
  title,
  fields,
  onClose
}: IProfileEdit<T>) => {
  return (
    <div className="flex w-[480px] flex-col items-center justify-center ">
      <div className="border-gray-3 mt-4 flex w-full flex-col gap-4 rounded-md border p-4">
        <div className="flex w-full">
          <h3 className="text-dark-blue-100">{title}</h3>{" "}
          <CloseButton
            onClick={onClose}
            className="hover:fill-light-blue-100 ml-auto w-[15px] cursor-pointer"
          />
        </div>

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

        <div className=" mt-2 w-[200px]">
          <Button onClick={() => {}}>Update details</Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
