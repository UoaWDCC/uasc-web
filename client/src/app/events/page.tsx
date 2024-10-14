"use client"

import EventsPage from "@/components/composite/EventsView/EventsView"
import { useLatestEventsQuery } from "@/services/Event/EventQueries"
import { useMemo } from "react"

const Events = () => {
  const { data } = useLatestEventsQuery()
  const rawEvents = useMemo(() => {
    const flattenedEvents = data?.pages.flatMap((page) => {
      return page.data || []
    })
    return flattenedEvents
  }, [data])

  return (
    <>
      <h2 className="text-dark-blue-100 mt-8 italic">Events</h2>
      <EventsPage rawEvents={rawEvents || []} />
    </>
  )
}

export default Events
