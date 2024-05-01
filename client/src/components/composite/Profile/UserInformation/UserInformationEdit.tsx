import Button from "components/generic/FigmaButtons/FigmaButton"
import TextInput from "components/generic/TextInputComponent/TextInput"
import { UserAdditionalInfo } from "models/User"

interface IUserInformationEdit {
    userData?: UserAdditionalInfo
    saveHandler?: () => void
}

const UserInformationEdit = ({ userData, saveHandler }: IUserInformationEdit) => {
    if (userData) {
        const { date_of_birth, ...displayableFields } = userData
        return (
            <>
                <Button variant="default-sm" onClick={saveHandler}>Save</Button>
                <div>
                    {/* TODO: Properly style and name fields */}
                    {Object.keys(displayableFields).map((key) => {
                        const _key = key as keyof typeof displayableFields
                        return (
                            <>
                                <h5>
                                    {_key}

                                </h5>
                                <TextInput value={displayableFields[_key] as string || ""} />
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

export default UserInformationEdit
