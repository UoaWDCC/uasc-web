import { ReducedUserAdditionalInfo } from "models/User"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import CloseButton from "assets/icons/x.svg?react"
import { useState } from "react"

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
  function handleClose() {
    setClosed(true)
  }
  const [closed, setClosed] = useState(false)
  if (!closed) {
    return (
      <div className="border-gray-3 flex w-[480px] flex-col items-center justify-center rounded-md border">
        <div className=" mt-4 flex w-full flex-col gap-4  p-4">
          <div className="flex w-full">
            <h3 className="text-dark-blue-100">{title}</h3>{" "}
            <CloseButton
              onClick={handleClose}
              className="hover:fill-light-blue-100 ml-auto w-[15px]"
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
        </div>
        <div className="mt-4 w-[200px]">
          <Button onClick={() => {}}>Update details</Button>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default ProfileEdit
