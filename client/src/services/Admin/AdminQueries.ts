import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import type { Timestamp } from "firebase/firestore"
import AdminService from "./AdminService"

export const ALL_USERS_QUERY = "allUsers"
export const ALL_BOOKINGS_BETWEEN_RANGE_QUERY = "bookings-between-range"
export const BOOKING_HISTORY_QUERY = "latest-booking-history"

export function useUsersQuery() {
  return useInfiniteQuery({
    queryKey: [ALL_USERS_QUERY],
    queryFn: AdminService.getUsers,
    retry: 1,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}

export function useAdminBookingsQuery(
  startDate: Timestamp,
  endDate: Timestamp
) {
  return useQuery({
    queryKey: [ALL_BOOKINGS_BETWEEN_RANGE_QUERY, startDate, endDate],
    queryFn: () =>
      AdminService.getBookingsBetweenDateRange({
        startDate,
        endDate
      }),
    retry: 0,
    staleTime: 30000 // 30 sec
  })
}

export function useBookingHistoryQuery() {
  return useInfiniteQuery({
    queryKey: [BOOKING_HISTORY_QUERY],
    queryFn: AdminService.getBookingHistory,
    retry: 0,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}

export function useGetEventQuery() {
  /**
   * Need to use a mutation instead of query because
   * we only want a manual trigger of the fetch
   */
  return useMutation({
    mutationKey: ["single-event"],
    mutationFn: AdminService.getEvent
  })
}

export function useMemberGoogleSheetUrlQuery() {
  return useQuery({
    queryKey: ["go-to-google-sheet"],
    queryFn: AdminService.getMemberGoogleSheetUrl
  })
}
