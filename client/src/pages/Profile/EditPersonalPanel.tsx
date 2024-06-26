import { ReducedUserAdditionalInfo } from "models/User"
import { useSelfDataQuery } from "services/User/UserQueries"
import WrappedProfileEdit, { IGeneralProfileEdit } from "./WrappedProfileEdit"

type EditPersonalFields = Pick<
  Partial<ReducedUserAdditionalInfo>,
  | "first_name"
  | "last_name"
  | "gender"
  | "student_id"
  | "date_of_birth"
  | "phone_number"
  | "emergency_contact"
>

/**
 * Displays the fields required to edit the personal section
 *
 * TODO: extend to include editing auth details (email etc)
 */
const EditPersonalPanel = ({ isOpen, handleClose }: IGeneralProfileEdit) => {
  const { data: currentUserData } = useSelfDataQuery()
  return (
    <WrappedProfileEdit<EditPersonalFields>
      isOpen={isOpen}
      handleClose={handleClose}
      fields={[
        {
          fieldName: "first_name",
          defaultFieldValue: currentUserData?.first_name
        },
        {
          fieldName: "last_name",
          defaultFieldValue: currentUserData?.last_name
        },

        {
          fieldName: "gender",
          defaultFieldValue: currentUserData?.gender
        },
        {
          fieldName: "date_of_birth",
          defaultFieldValue: currentUserData?.date_of_birth
        },
        {
          fieldName: "phone_number",
          defaultFieldValue: currentUserData?.phone_number
        },
        {
          fieldName: "emergency_contact",
          defaultFieldValue: currentUserData?.emergency_contact
        },
        {
          fieldName: "student_id",
          defaultFieldValue: currentUserData?.student_id
        }
      ]}
    ></WrappedProfileEdit>
  )
}
export default EditPersonalPanel
