import { useCreateEventMutation } from "@/services/Admin/AdminMutations"
import AdminEventView from "./AdminEventView"

const WrappedAdminEventView = () => {
  const { mutateAsync: handleEventCreation } = useCreateEventMutation()
  return (
    <>
      <AdminEventView handleCreateEvent={handleEventCreation} />
    </>
  )
}

export default WrappedAdminEventView
