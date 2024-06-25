import { FieldValue } from "firebase/firestore"
import { ReducedUserAdditionalInfo } from "models/User"
import { useAppData } from "store/Store"
import TextInput from "components/generic/TextInputComponent/TextInput"
interface IProfileEdit<T extends Partial<ReducedUserAdditionalInfo>> {
  title: string
  fields: {
    fieldName: string
    defaultFieldValue: string
  }[]
  onEdit: (fields: Partial<T>) => void
}

const Field = ({
  subtitle,
  description
}: {
  subtitle: string
  description: string
}) => {
  return (
    <>
      <div>
        <p className="">{subtitle}</p>

        <p>{description}</p>
      </div>
    </>
  )
}

const ProfileEdit = <T extends Partial<ReducedUserAdditionalInfo>>({
  title,
  fields,
  onEdit
}: IProfileEdit<T>) => {
  const [{ currentUserData }] = useAppData()
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full border border-black">
        {fields.map((field) => {
          return <input key={field.fieldName}></input>
        })}
      </div>
    </div>
  )
}

export default ProfileEdit
