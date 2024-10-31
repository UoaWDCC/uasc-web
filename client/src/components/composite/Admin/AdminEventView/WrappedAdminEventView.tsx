"use client"

import { useCreateEventMutation } from "@/services/Admin/AdminMutations"
import AdminEventView from "./AdminEventView"
import StorageService from "@/services/Storage/StorageService"
import { useLatestEventsQuery } from "@/services/Event/EventQueries"
import { useMemo } from "react"

const WrappedAdminEventView = () => {
  const { mutateAsync: handleEventCreation } = useCreateEventMutation()
  const {
    data,
    isPending,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage
  } = useLatestEventsQuery()
  const rawEvents = useMemo(() => {
    const flattenedEvents = data?.pages.flatMap((page) => {
      return page.data || []
    })
    return flattenedEvents
  }, [data])

  return (
    <>
      <AdminEventView
        handlePostEvent={handleEventCreation}
        generateImageLink={async (image) =>
          await StorageService.uploadEventImage(image)
        }
        rawEvents={rawEvents || []}
        hasMoreEvents={hasNextPage}
        isLoading={isPending}
        fetchMoreEvents={() => {
          if (!isFetchingNextPage && !isFetching) {
            fetchNextPage()
          }
        }}
      />
    </>
  )
}

export default WrappedAdminEventView
