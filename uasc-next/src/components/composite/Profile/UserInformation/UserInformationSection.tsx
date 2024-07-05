import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import UserInformationEdit from "./UserInformationEdit"
import UserInformationDisplay from "./UserInformationDisplay"
import { UserAdditionalInfo } from "@/models/User"

interface IUserInformationSection {
  userData?: UserAdditionalInfo
}

const UserInformationSection = ({ userData }: IUserInformationSection) => {
  const [searchParams] = useSearchParams()
  const [isEdit, setIsEdit] = useState<boolean>(!!searchParams.get("edit"))

  return (
    <>
      {isEdit ? (
        <UserInformationEdit
          saveHandler={() => setIsEdit(false)}
          userData={userData}
        />
      ) : (
        <UserInformationDisplay
          editHandler={() => setIsEdit(true)}
          userData={userData}
        />
      )}
    </>
  )
}

export default UserInformationSection
