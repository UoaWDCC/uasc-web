import { UserAdditionalInfo } from "models/User"

interface IProfileCard {
  userData?: UserAdditionalInfo
}

const UserInformation = ({ userData }: IProfileCard) => {
  if (userData) {
    const { date_of_birth, ...displayableFields } = userData
    return (
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
    )
  }
  return <>No Data found</>
}

export default UserInformation
