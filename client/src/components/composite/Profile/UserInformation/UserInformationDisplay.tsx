import Button from "components/generic/FigmaButtons/FigmaButton"
import { UserAdditionalInfo } from "models/User"

interface IUserInformationDisplay {
  userData?: UserAdditionalInfo
  editHandler?: () => void
}

const UserInformationDisplay = ({
  userData,
  editHandler
}: IUserInformationDisplay) => {
  if (userData) {
    const { date_of_birth, ...displayableFields } = userData
    return (
      <>
        <Button variant="default-sm" onClick={editHandler}>
          Edit
        </Button>
        <div>
          {/* TODO: Properly style and name fields */}
          {Object.keys(displayableFields).map((key) => {
            const _key = key as keyof typeof displayableFields
            return (
              <>
                <h5>
                  {_key}: {displayableFields[_key]}
                </h5>
              </>
            )
          })}
          <h5>{new Date(date_of_birth.seconds * 1000).toDateString()}</h5>
        </div>
      </>
    )
  }
  return <>No Data found</>
}

export default UserInformationDisplay
