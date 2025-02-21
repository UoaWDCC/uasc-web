import Link from "next/link"

interface IEmergencyContactAlert {
  userEmergencyContact?: string
}

export const isValidEmergencyContact = (
  userEmergencyContact: string | undefined
) => {
  return userEmergencyContact && userEmergencyContact.length > 1 // 2 or more characters
}

/**
 * Alert to remind user to set an emergency contact before booking
 */
const EmergencyContactAlert = ({
  userEmergencyContact
}: IEmergencyContactAlert) => {
  const validEmergencyContact = isValidEmergencyContact(userEmergencyContact)
  const ProfileLink = (
    <Link className="text-light-blue-100" href="/profile">
      profile
    </Link>
  )

  const Message = validEmergencyContact ? (
    <>
      Is your emergency contact{" "}
      <span className="text-light-blue-100 font-bold">
        {userEmergencyContact}
      </span>{" "}
      still correct? If not you MUST update it before booking. You should edit
      it in your {ProfileLink}
    </>
  ) : (
    <>
      You MUST set an emergency contact before booking, go to your {ProfileLink}
      !
    </>
  )

  return (
    <div className="border-gray-3 flex flex-col gap-2 rounded border bg-white p-3">
      <h5 className="text-dark-blue-100 font-bold uppercase">
        Important - Double check your emergency contact!
      </h5>
      <div>
        <p>{Message}</p>
      </div>
    </div>
  )
}

export default EmergencyContactAlert
