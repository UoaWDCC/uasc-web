import { useInfiniteQuery } from "@tanstack/react-query"
import EventService from "./EventService"

export function useLatestEventsQuery() {
  return useInfiniteQuery({
    queryFn: EventService.getAllEvents,
    queryKey: ["fetch-all-events"],
    retry: 1,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
