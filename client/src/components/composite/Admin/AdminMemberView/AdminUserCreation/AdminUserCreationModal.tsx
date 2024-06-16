import Dropdown from "components/generic/Dropdown/Dropdown"
import Button from "components/generic/FigmaButtons/FigmaButton"
import TextInput from "components/generic/TextInputComponent/TextInput"
import { Timestamp } from "firebase/firestore"
import { FormEvent, useRef, useState } from "react"
import { SignUpUserBody } from "services/User/UserService"
import CloseIcon from "assets/icons/x.svg?react"
import { useClickOutside } from "components/utils/Utils"

interface IAdminUserCreationModal {
  /**
   * When the new details have been filled in on the create new user form this
   * callback will be invoked.
   *
   * @param details `SignUpUserBody` type, used to call a sign up endpoint
   * @param giveUserMembership whether or not the newly created member should be made a member
   */
  userCreationHandler?: (
    details: SignUpUserBody,
    giveUserMembership: boolean
  ) => void
  /**
   * Callback for when a 'close' event is triggered with the modal open
   */
  handleClose?: () => void
}

const GUEST_OPTION = "guest" as const
const MEMBER_OPTION = "member" as const

/**
 * @deprecated Do not use, exported for testing purposes
 */
export const AdminUserCreationFormKeys = {
  FIRST_NAME: "first name",
  EMAIL: "email",
  LAST_NAME: "last name",
  DIETARY_REQUIREMENTS: "dietary requirements",
  PHONE_NUMBER: "phone number",
  DATE_OF_BIRTH: "dob",
  MEMBERSHIP_TYPE: "membership"
} as const

/**
 * Used for the dropdown indicating what type of member should be created
 */
type UserType = typeof GUEST_OPTION | typeof MEMBER_OPTION

/**
 * Popup that should be opened when the admin wants to add a new user,
 * assumedly on the `AdminMemberView` page.
 */
const AdminUserCreationModal = ({
  userCreationHandler,
  handleClose
}: IAdminUserCreationModal) => {
  const [userType, setUserType] = useState<UserType>("guest")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const formContainerRef = useRef<HTMLDivElement>(null)
  useClickOutside(formContainerRef, () => {
    handleClose?.()
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const data = new FormData(e.currentTarget)
      const shouldGiveUserMembership = userType === "member"

      userCreationHandler?.(
        {
          email: data.get(AdminUserCreationFormKeys.EMAIL) as string,
          user: {
            date_of_birth: Timestamp.fromDate(
              new Date(
                data.get(AdminUserCreationFormKeys.DATE_OF_BIRTH) as string
              )
            ),
            first_name: data.get(
              AdminUserCreationFormKeys.FIRST_NAME
            ) as string,
            last_name: data.get(AdminUserCreationFormKeys.LAST_NAME) as string,
            dietary_requirements: (data.get(
              AdminUserCreationFormKeys.DIETARY_REQUIREMENTS
            ) || "") as string,
            phone_number: Number.parseInt(
              data.get(AdminUserCreationFormKeys.PHONE_NUMBER) as string
            )
          }
        },
        shouldGiveUserMembership
      )
      e.currentTarget.reset()
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div
      ref={formContainerRef}
      className="border-gray-4 flex w-full max-w-[800px] 
                    flex-col items-center rounded-md border bg-white px-2 py-8"
    >
      <div
        className="ml-auto mr-2 h-[15px] w-[15px] cursor-pointer sm:mr-8"
        aria-label="close create users popup"
        onClick={() => handleClose?.()}
      >
        <CloseIcon />
      </div>
      <h2>Add new member</h2>
      <form
        onSubmit={handleSubmit}
        className="xs:max-w-[500px] flex w-full max-w-[250px] flex-col gap-2"
      >
        <TextInput
          name={AdminUserCreationFormKeys.FIRST_NAME}
          type="text"
          label="First Name"
          data-testid={AdminUserCreationFormKeys.FIRST_NAME}
          required
        />
        <TextInput
          name={AdminUserCreationFormKeys.LAST_NAME}
          label="Last Name"
          data-testid={AdminUserCreationFormKeys.LAST_NAME}
          required
        />
        <TextInput
          name={AdminUserCreationFormKeys.EMAIL}
          data-testid={AdminUserCreationFormKeys.EMAIL}
          type="email"
          label="Email"
          required
        />
        <TextInput
          name={AdminUserCreationFormKeys.DIETARY_REQUIREMENTS}
          data-testid={AdminUserCreationFormKeys.DIETARY_REQUIREMENTS}
          type="text"
          label="Dietary Requirements"
        />
        <TextInput
          name={AdminUserCreationFormKeys.PHONE_NUMBER}
          data-testid={AdminUserCreationFormKeys.PHONE_NUMBER}
          label="Phone Number"
          type="tel"
          required
        />
        <TextInput
          name={AdminUserCreationFormKeys.PHONE_NUMBER}
          data-testid={AdminUserCreationFormKeys.DATE_OF_BIRTH}
          label="Date of Birth"
          type="date"
          required
        />
        <Dropdown
          name={AdminUserCreationFormKeys.MEMBERSHIP_TYPE}
          data-testid={AdminUserCreationFormKeys.MEMBERSHIP_TYPE}
          value={userType}
          label="Membership Status"
          onChange={(e) => setUserType(e.target.value as UserType)}
        >
          <option>{GUEST_OPTION}</option>
          <option>{MEMBER_OPTION}</option>
        </Dropdown>
        <Button
          disabled={isSubmitting}
          type="submit"
          data-testid="add-new-member-button"
        >
          Add Member
        </Button>
      </form>
    </div>
  )
}

export default AdminUserCreationModal
