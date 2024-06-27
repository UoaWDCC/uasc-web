import { ReducedUserAdditionalInfo } from "models/User"
import TextInput from "components/generic/TextInputComponent/TextInput"
import Button from "components/generic/FigmaButtons/FigmaButton"
import CloseButton from "assets/icons/x.svg?react"
import { Timestamp } from "firebase/firestore"
import { DateUtils, UnknownTimestamp } from "components/utils/DateUtils"
import { useState } from "react"

interface IProfileEdit<T extends Partial<ReducedUserAdditionalInfo>> {
  /**
   * The text to be displayed as the heading
   */
  title: string
  /**
   * Callback for when the X button is clicked
   */
  onClose: () => void
  fields: {
    /**
     * the **key** of the value in `ReducedUserAdditionalInfo` to display as a field
     */
    fieldName: keyof T
    /**
     * The value to display in the field with no edits made
     */
    defaultFieldValue?: ReducedUserAdditionalInfo[keyof ReducedUserAdditionalInfo]
  }[]
  /**
   * Callback that provides the fields that were changed in the edit form
   *
   * @param fields an object of all the changed fields
   */
  onEdit: (fields: Partial<T>) => void
  /**
   * If there is an ongoing operation (i.e calling the edit endpoint)
   */
  isPending?: boolean
}

/**
 * Gets a semantic name for the keys in user data
 *
 * @param originalName the key from `ReducedUserAdditionalInfo` to transform
 * @returns a semantic name for the original key
 */
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

/**
 * Panel for when profile needs to be edited.
 * 
 * The fields displayed should be determened by the generic typing
 * 
 * @example
    <ProfileEdit<{
      first_name: string
      last_name: string
      date_of_birth: { seconds: number; nanoseconds: number }
      faculty: string
      phone_number: number
      emergency_contact: string
      student_id: string
    }> 
      title="example"
      />
 */
const ProfileEdit = <T extends Partial<ReducedUserAdditionalInfo>>({
  title,
  fields,
  onClose,
  onEdit,
  isPending
}: IProfileEdit<T>) => {
  const [currentFormState, setCurrentFormState] =
    useState<Partial<ReducedUserAdditionalInfo>>()
  return (
    <div className="z-50 flex max-w-[480px] flex-col items-center justify-center">
      <div className="border-gray-3 mt-4 flex w-full flex-col gap-4 rounded-md border bg-white p-4 ">
        <div className="flex w-full">
          <h3 className="text-dark-blue-100">{title}</h3>{" "}
          <CloseButton
            onClick={onClose}
            className="hover:fill-light-blue-100 ml-auto w-[15px] cursor-pointer"
          />
        </div>
        <form>
          {fields.map((field) => {
            const defaultValue = field.defaultFieldValue
            const isDate = field.fieldName === "date_of_birth"
            const isTel = field.fieldName === "phone_number"
            const isBool =
              field.fieldName === "does_snowboarding" ||
              field.fieldName === "does_ski"
            return (
              <TextInput
                key={field.fieldName.toString()}
                label={nameTransformer(
                  field.fieldName as keyof ReducedUserAdditionalInfo
                )}
                type={
                  isDate ? "date" : isTel ? "tel" : isBool ? "checkbox" : "text"
                }
                onChange={(e) =>
                  setCurrentFormState({
                    ...currentFormState,
                    [field.fieldName]: isDate
                      ? // Need to store as timestamp, not date which the input provides
                        Timestamp.fromDate(
                          DateUtils.convertLocalDateToUTCDate(
                            e.target.valueAsDate || new Date()
                          )
                        )
                      : // Does skiing/snowboarding
                        isBool
                        ? e.target.checked
                        : // Phone number
                          e.target.value
                  })
                }
                defaultValue={
                  isDate && defaultValue
                    ? DateUtils.formatDateForInput(
                        new Date(
                          DateUtils.timestampMilliseconds(
                            defaultValue as UnknownTimestamp
                          )
                        )
                      )
                    : (defaultValue as string)
                }
              />
            )
          })}

          <div className=" mt-2 w-[200px]">
            <Button
              disabled={isPending || !currentFormState}
              onClick={() => {
                onEdit(currentFormState as T)
                setCurrentFormState(undefined)
              }}
            >
              Update details
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit
