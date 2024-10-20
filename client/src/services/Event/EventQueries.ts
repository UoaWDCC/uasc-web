import { useInfiniteQuery } from "@tanstack/react-query"
import EventService from "./EventService"

/**
 * A paginated query to fetch events (using a wrapper around the {@link EventService})
 */
export function useLatestEventsQuery() {
  return useInfiniteQuery({
    queryFn: EventService.getAllEvents,
    queryKey: ["fetch-all-events"],
    staleTime: 0, // always poll
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
