"use client"

import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useEditEventMutation
} from "@/services/Admin/AdminMutations"
import AdminEventView from "./AdminEventView"
import StorageService from "@/services/Storage/StorageService"
import { useLatestEventsQuery } from "@/services/Event/EventQueries"
import { useMemo, useState } from "react"
import { useGetEventQuery } from "@/services/Admin/AdminQueries"
import { Event } from "@/models/Events"
import Loader from "@/components/generic/SuspenseComponent/Loader"

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

  const { mutateAsync: editEvent } = useEditEventMutation()

  const { mutateAsync: deleteEvent } = useDeleteEventMutation()

  const [eventPreviousData, setEventPreviousData] = useState<
    Event | undefined
  >()

  const { mutateAsync: fetchEventToBeEdited } = useGetEventQuery()

  const rawEvents = useMemo(() => {
    const flattenedEvents = data?.pages.flatMap((page) => {
      return page.data || []
    })
    return flattenedEvents
  }, [data])

  if (!fetchEventToBeEdited) {
    return <Loader />
  }

  return (
    <>
      <AdminEventView
        handlePostEvent={handleEventCreation}
        generateImageLink={async (image) =>
          await StorageService.uploadEventImage(image)
        }
        fetchEventToEdit={async (id) => {
          if (id) {
            setEventPreviousData(await fetchEventToBeEdited(id))
          } else {
            /**
             * If we go back to the main screen we
             * don't have an event id thats being edited,
             * so we have to consider the data stale
             */
            setEventPreviousData(undefined)
          }
        }}
        handleEditEvent={async (eventId, newData) => {
          await editEvent({ eventId, newData })
        }}
        handleDeleteEvent={deleteEvent}
        eventPreviousData={eventPreviousData}
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
