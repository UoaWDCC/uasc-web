import { ReducedUserAdditionalInfo } from "models/User"
import { useAppData } from "store/Store"

inter

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

const ProfileEdit = <T extends Partial<ReducedUserAdditionalInfo>>() => {
  const [{ currentUserData }] = useAppData()
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full border border-black">
        <Field
          subtitle="Name"
          description={`${currentUserData?.first_name}`}
        ></Field>
      </div>
    </div>
  )
}

export default profileEdit
