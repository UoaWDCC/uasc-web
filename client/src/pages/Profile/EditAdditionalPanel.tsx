import { ReducedUserAdditionalInfo } from "models/User"
import { useSelfDataQuery } from "services/User/UserQueries"
import WrappedProfileEdit, { IGeneralProfileEdit } from "./WrappedProfileEdit"

type EditAdditionalFields = Pick<
  Partial<ReducedUserAdditionalInfo>,
  "does_snowboarding" | "does_ski" | "dietary_requirements"
>

/**
 * Allows the user to edit the miscellaneous information.
 */
const EditAdditionalPanel = ({ isOpen, handleClose }: IGeneralProfileEdit) => {
  const { data: currentUserData } = useSelfDataQuery()
  return (
    <WrappedProfileEdit<EditAdditionalFields>
      isOpen={isOpen}
      handleClose={handleClose}
      fields={[
        {
          fieldName: "dietary_requirements",
          defaultFieldValue: currentUserData?.dietary_requirements
        },
        {
          fieldName: "does_ski",
          defaultFieldValue: currentUserData?.does_ski
        },
        {
          fieldName: "does_snowboarding",
          defaultFieldValue: currentUserData?.does_snowboarding
        }
      ]}
    ></WrappedProfileEdit>
  )
}
export default EditAdditionalPanel
