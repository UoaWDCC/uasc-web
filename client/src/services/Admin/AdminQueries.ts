import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import AdminService from "./AdminService"

export function useUsersQuery() {
  return useInfiniteQuery({
    queryKey: ["allUsers"],
    queryFn: AdminService.getUsers,
    retry: 1,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}

export function useAdminBookingsQuery() {
  return useQuery({
    queryKey: ["bookingsBetweenRange"],
    queryFn:  () => AdminService.getBookingsBetweenDateRange({}),
    retry: 0,
  })
}
