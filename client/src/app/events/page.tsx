"use client"

import EventsPage from "@/components/composite/EventsView/EventsView"
import { EventsCardProps } from "@/components/generic/EventsCard/EventsCard"
import { useLatestEventsQuery } from "@/services/Event/EventQueries"
import { useMemo } from "react"

const Events = () => {
  const { data } = useLatestEventsQuery()
  const rawEvents = useMemo(() => {
    const flattenedEvents = data?.pages.flatMap((page) => {
      return page.data
    })
    return flattenedEvents
  }, [data])

  const formattedEvents: EventsCardProps[] =
    rawEvents?.map((event) => {
      return {
        date: "...",
        title: event?.title || "",
        location: event?.location,
        content: <></>,
        onClick: () => {}
      }
    }) || []

  return (
    <>
      <EventsPage events={formattedEvents} />
    </>
  )
}

export default Events
