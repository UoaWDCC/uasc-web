import Dropdown from "components/generic/Dropdown/Dropdown"
import Button from "components/generic/FigmaButtons/FigmaButton"
import TextInput from "components/generic/TextInputComponent/TextInput"
import { Timestamp } from "firebase/firestore"
import { FormEvent, useRef, useState } from "react"
import { SignUpUserBody } from "services/User/UserService"
import CloseIcon from "assets/icons/x.svg?react"
import { useClickOutside } from "components/utils/Utils"

const GUEST_OPTION = "guest" as const
const MEMBER_OPTION = "member" as const

export type AccountType = typeof GUEST_OPTION | typeof MEMBER_OPTION

interface IAdminUserCreationModal {
  /**
   * When the new details have been filled in on the create new user form this
   * callback will be invoked.
   *
   * @param details `SignUpUserBody` type, used to call a sign up endpoint
   * @param accountType whether or not the newly created member should be made a member
   */
  userCreationHandler?: (
    details: SignUpUserBody,
    accountType: AccountType
  ) => void
  /**
   * Callback for when a 'close' event is triggered with the modal open
   */
  handleClose?: () => void
}

/**
 * @deprecated Do not use, exported for testing purposes
 */
export const AdminUserCreationFormKeys = {
  FIRST_NAME: "first name",
  EMAIL: "email",
  LAST_NAME: "last name",
  DIETARY_REQUIREMENTS: "dietary requirements",
  PHONE_NUMBER: "phone number",
  EMERGENCY_CONTACT: "emergency contact",
  DATE_OF_BIRTH: "dob",
  MEMBERSHIP_TYPE: "membership"
} as const

/**
 * Used for the dropdown indicating what type of member should be created
 */

const userTypeDescription = (userType: AccountType) => {
  switch (userType) {
    case "guest":
      return `A guest member will not be able to make bookings themselves, 
              however can manually be added to bookings. They may however log in to
              pay for a membership`
    case "member":
      return `A member will be able to make bookings themselves after logging in`
  }
}

/**
 * Popup that should be opened when the admin wants to add a new user,
 * assumedly on the `AdminMemberView` page.
 */
const AdminUserCreationModal = ({
  userCreationHandler,
  handleClose
}: IAdminUserCreationModal) => {
  /**
   * Used to accomdate for conditional handling of user creation
   * (i.e guests do not need to be "promted" after creation )
   */
  const [accountType, setAccountType] = useState<AccountType>("guest")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  /**
   * We should assume the modal is to be closed after clicking outside the form
   * container
   */
  const formContainerRef = useRef<HTMLDivElement>(null)
  useClickOutside(formContainerRef, () => {
    handleClose?.()
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const userData = {
      email: data.get(AdminUserCreationFormKeys.EMAIL) as string,
      user: {
        date_of_birth: Timestamp.fromDate(
          new Date(data.get(AdminUserCreationFormKeys.DATE_OF_BIRTH) as string)
        ),
        first_name: data.get(AdminUserCreationFormKeys.FIRST_NAME) as string,
        last_name: data.get(AdminUserCreationFormKeys.LAST_NAME) as string,
        dietary_requirements: (data.get(
          AdminUserCreationFormKeys.DIETARY_REQUIREMENTS
        ) || "") as string,
        emergency_contact: (data.get(
          AdminUserCreationFormKeys.EMERGENCY_CONTACT
        ) || "") as string,
        phone_number: Number.parseInt(
          data.get(AdminUserCreationFormKeys.PHONE_NUMBER) as string
        )
      }
    }
    if (
      !confirm(
        `Are you sure you want to add the user ${userData.user.first_name} 
        ${userData.user.last_name} (${userData.email}) as a ${accountType}?`
      )
    ) {
      return
    }

    try {
      setIsSubmitting(true)
      userCreationHandler?.(userData, accountType)
      e.currentTarget.reset()
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div
      ref={formContainerRef}
      className="border-gray-4 mt-72 flex w-full max-w-[800px] flex-col 
                    items-center rounded-md border bg-white px-2 py-8"
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
          name={AdminUserCreationFormKeys.EMERGENCY_CONTACT}
          data-testid={AdminUserCreationFormKeys.EMERGENCY_CONTACT}
          label="Emergency Contact"
          type="text"
          required
        />
        <TextInput
          name={AdminUserCreationFormKeys.PHONE_NUMBER}
          data-testid={AdminUserCreationFormKeys.DATE_OF_BIRTH}
          label="Date of Birth"
          type="date"
          defaultValue={"2000-01-01"}
          required
        />
        <Dropdown
          name={AdminUserCreationFormKeys.MEMBERSHIP_TYPE}
          data-testid={AdminUserCreationFormKeys.MEMBERSHIP_TYPE}
          value={accountType}
          label="Membership Status"
          onChange={(e) => setAccountType(e.target.value as AccountType)}
        >
          <option>{GUEST_OPTION}</option>
          <option>{MEMBER_OPTION}</option>
        </Dropdown>
        <h5>{userTypeDescription(accountType)}</h5>
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
