"use client"

import EventsPage from "@/components/composite/EventsView/EventsView"
import { useLatestEventsQuery } from "@/services/Event/EventQueries"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const EVENT_QUERY_KEY = "id" as const

const Events = () => {
  /**
   * We need a way to set the param, in case a user pastes in a link
   * shared by someone else. This would ideally be a dynamic route,
   * however as we are using static export this is the best workaround
   */
  const params = useSearchParams()
  const router = useRouter()
  const [preselectedEventId, setPreselectedEventId] = useState<
    string | undefined
  >(params.get(EVENT_QUERY_KEY) || undefined)

  /**
   * Set the search params (i.e `/events?id={id}`) to the required value
   */
  useEffect(() => {
    const url = new URL(window.location.href)

    if (!preselectedEventId) {
      url.searchParams.delete(EVENT_QUERY_KEY)
    } else {
      url.searchParams.set(EVENT_QUERY_KEY, preselectedEventId)
    }

    router.push(url.toString())
  }, [preselectedEventId, router])

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
      <h2 className="text-dark-blue-100 mt-8 italic">Events</h2>
      <EventsPage
        onSelectedEventIdChange={setPreselectedEventId}
        preselectedEventId={preselectedEventId}
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

export default Events
