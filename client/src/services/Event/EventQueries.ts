import { useInfiniteQuery } from "@tanstack/react-query"
import EventService from "./EventService"

export const ALL_EVENTS_QUERY_KEY = "fetch-all-events" as const

/**
 * A paginated query to fetch events (using a wrapper around the {@link EventService})
 */
export function useLatestEventsQuery(isMember: boolean) {
  return useInfiniteQuery({
    queryFn: isMember
      ? EventService.getAllEventsAsMember
      : EventService.getAllEvents,
    queryKey: [ALL_EVENTS_QUERY_KEY, isMember],
    staleTime: 0, // always poll
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
