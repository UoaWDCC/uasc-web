import type { ReducedUserAdditionalInfo } from "@/models/User"
import { useSelfDataQuery } from "@/services/User/UserQueries"
import WrappedProfileEdit, {
  type IGeneralProfileEdit
} from "./WrappedProfileEdit"

type EditAdditionalFields = Pick<
  Partial<ReducedUserAdditionalInfo>,
  | "does_snowboarding"
  | "does_ski"
  | "dietary_requirements"
  | "has_whakapapa_season_pass"
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
        },
        {
          fieldName: "has_whakapapa_season_pass",
          defaultFieldValue: currentUserData?.has_whakapapa_season_pass
        }
      ]}
    ></WrappedProfileEdit>
  )
}
export default EditAdditionalPanel
