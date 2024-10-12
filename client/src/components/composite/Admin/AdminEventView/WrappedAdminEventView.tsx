"use client"

import { useCreateEventMutation } from "@/services/Admin/AdminMutations"
import AdminEventView from "./AdminEventView"
import StorageService from "@/services/Storage/StorageService"

const WrappedAdminEventView = () => {
  const { mutateAsync: handleEventCreation } = useCreateEventMutation()
  return (
    <>
      <AdminEventView
        handlePostEvent={handleEventCreation}
        generateImageLink={async (image) =>
          await StorageService.uploadEventImage(image)
        }
      />
    </>
  )
}

export default WrappedAdminEventView
