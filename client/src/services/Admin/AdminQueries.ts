import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Timestamp } from "firebase/firestore"
import AdminService from "./AdminService"

export const ALL_USERS_QUERY = "allUsers"

export function useUsersQuery() {
  return useInfiniteQuery({
    queryKey: [ALL_USERS_QUERY],
    queryFn: AdminService.getUsers,
    retry: 1,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}

export function useAdminBookingsQuery() {
  return useQuery({
    queryKey: ["bookingsBetweenRange"],
    queryFn: () =>
      AdminService.getBookingsBetweenDateRange({
        endDate: Timestamp.fromDate(new Date("01/01/2025"))
      }),
    retry: 0
  })
}
