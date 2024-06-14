import { useAppData } from "store/Store"
const profileEdit = () => {
  const [{ currentUserData }] = useAppData()
  const [{ currentUser }] = useAppData()
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-[45%] border border-black"></div>
    </div>
  )
}

export default profileEdit
