import { ReducedUserAdditionalInfo } from "models/User"
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
  return (
    <div className="flex w-full items-center justify-center">
      <h3 className="">{title}</h3>
      <div className="w-full border border-black">
        {fields.map((field) => {
          return <TextInput key={field.fieldName} label={field.fieldName} />
        })}
      </div>
    </div>
  )
}

export default ProfileEdit
