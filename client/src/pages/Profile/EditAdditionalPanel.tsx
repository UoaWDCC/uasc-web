import ProfileEdit from "components/composite/Profile/ProfileEdit/ProfileEdit"
import ModalContainer from "components/generic/ModalContainer/ModalContainer"
import { ReducedUserAdditionalInfo } from "models/User"
import { useEffect } from "react"
import { useEditSelfMutation } from "services/User/UserMutations"
import { useSelfDataQuery } from "services/User/UserQueries"

type EditAdditionalFields = Pick<
  Partial<ReducedUserAdditionalInfo>,
  "does_snowboarding" | "does_ski" | "dietary_requirements"
>

const EditAdditionalPanel = ({
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
      <ProfileEdit<EditAdditionalFields>
        title="Additional Details"
        isPending={isPending}
        onClose={handleClose}
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
        onEdit={async (userData) => {
          await mutateAsync(userData)
        }}
      />
    </ModalContainer>
  )
}
export default EditAdditionalPanel
