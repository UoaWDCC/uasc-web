import { useAppData } from "store/Store"

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

const profileEdit = () => {
  const [{ currentUserData }] = useAppData()
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-[45%] border border-black">
        <Field
          subtitle="Name"
          description={`${currentUserData?.first_name}`}
        ></Field>
      </div>
    </div>
  )
}

export default profileEdit
