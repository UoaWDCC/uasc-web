import ProfileEdit from "components/composite/Profile/ProfileEdit/ProfileEdit"
import ModalContainer from "components/generic/ModalContainer/ModalContainer"
import { ReducedUserAdditionalInfo } from "models/User"
import { useEffect } from "react"
import { useEditSelfMutation } from "services/User/UserMutations"
import { useSelfDataQuery } from "services/User/UserQueries"

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

const EditPersonalPanel = ({
  isOpen,
  handleClose
}: {
  isOpen: boolean
  handleClose: () => void
}) => {
  const { data: currentUserData } = useSelfDataQuery()
  const { mutateAsync, error, isPending, isSuccess } = useEditSelfMutation()

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  return (
    <ModalContainer isOpen={isOpen}>
      <ProfileEdit<EditPersonalFields>
        title="Personal Details"
        isPending={isPending}
        onClose={handleClose}
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
        onEdit={async (userData) => {
          await mutateAsync(userData)
        }}
      />
    </ModalContainer>
  )
}
export default EditPersonalPanel
