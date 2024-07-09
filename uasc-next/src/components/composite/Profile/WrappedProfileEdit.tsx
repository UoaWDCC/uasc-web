import ProfileEdit from "@/components/composite/Profile/ProfileEdit/ProfileEdit"
import ModalContainer from "@/components/generic/ModalContainer/ModalContainer"
import { ReducedUserAdditionalInfo } from "@/models/User"
import { useEffect } from "react"
import { useEditSelfMutation } from "@/services/User/UserMutations"

interface IWrappedProfileEdit {
  /**
   * Whether the modal should display, overlaying the screen
   */
  isOpen: boolean
  /**
   * Should set the `isOpen` status to false
   */
  handleClose: () => void
  /**
   * additional information about the fields
   */
  fields: {
    /**
     * The name of the **key** in ReducedUserAdditionalInformation that corresponds to
     * the field to be displayed
     */
    fieldName: keyof Partial<ReducedUserAdditionalInfo>
    /**
     * The value that should be displayed when no edits have been made to the field
     *
     * Likely would be the original infomation fetched about the user
     */
    defaultFieldValue?: ReducedUserAdditionalInfo[keyof ReducedUserAdditionalInfo]
  }[]
}

/**
 * Should be used for any component that wraps the `WrappedProfileEdit`
 *
 * Contains the `onClose` handler and the `isOpen` status of the modal
 */
export interface IGeneralProfileEdit
  extends Omit<IWrappedProfileEdit, "fields"> {}

/**
 * Includes all the app-specfic callbacks for the `ProfileEdit` component
 *
 * handles all alerting and mutations, this should futher be wrapped to specify
 * what fields from `ReducedUserAdditionalInfo` should be included
 */
const WrappedProfileEdit = <T extends Partial<ReducedUserAdditionalInfo>>({
  isOpen,
  handleClose,
  fields
}: IWrappedProfileEdit) => {
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
      <ProfileEdit<T>
        title="Personal Details"
        isPending={isPending}
        onClose={handleClose}
        fields={fields}
        onEdit={async (userData) => {
          await mutateAsync(userData)
        }}
      />
    </ModalContainer>
  )
}
export default WrappedProfileEdit
