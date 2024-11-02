import { useMutation } from "@tanstack/react-query"
import AdminService from "./AdminService"
import { Timestamp } from "firebase/firestore"
import queryClient from "@/services/QueryClient"
import { BOOKING_AVAILABLITY_KEY } from "@/services/Booking/BookingQueries"
import {
  ALL_BOOKINGS_BETWEEN_RANGE_QUERY,
  ALL_USERS_QUERY,
  BOOKING_HISTORY_QUERY
} from "./AdminQueries"
import { CombinedUserData } from "@/models/User"
import { replaceUserInPage } from "./AdminUtils"
import { ALL_EVENTS_QUERY_KEY } from "../Event/EventQueries"

export function usePromoteUserMutation() {
  return useMutation({
    mutationKey: ["promote-user"],
    mutationFn: AdminService.promoteUser,
    onMutate: async (newUid) => {
      const previousUserPages = queryClient.getQueryData([ALL_USERS_QUERY]) as {
        pages: Array<{ data: CombinedUserData[] }>
      }

      const newUserPages = replaceUserInPage(
        previousUserPages,
        newUid,
        "membership",
        "member"
      )
      queryClient.setQueryData([ALL_USERS_QUERY], newUserPages)
      return { previousUserPages }
    },
    onError: (...args) => {
      const [err, , context] = args
      console.error("failed to promote user:", err)
      queryClient.setQueryData([ALL_USERS_QUERY], context?.previousUserPages)
    }
  })
}

export function useDemoteUserMutation() {
  return useMutation({
    mutationKey: ["demote-user"],
    mutationFn: AdminService.demoteUser,
    onMutate: async (newUid) => {
      const previousUserPages = queryClient.getQueryData([ALL_USERS_QUERY]) as {
        pages: Array<{ data: CombinedUserData[] }>
      }
      const newUserPages = replaceUserInPage(
        previousUserPages,
        newUid,
        "membership",
        "guest"
      )
      queryClient.setQueryData([ALL_USERS_QUERY], newUserPages)
      return { previousUserPages }
    },
    onError: (...args) => {
      const [err, , context] = args
      console.error("failed to demote user:", err)
      queryClient.setQueryData([ALL_USERS_QUERY], context?.previousUserPages)
    }
  })
}

export function useDeleteUserMutation() {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: AdminService.deleteUser,
    retry: 0,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [ALL_USERS_QUERY] })
    }
  })
}

/**
 * Hook for dealing with making dates available
 *
 * @param startDate **UTC midnight** date representing the start (inclusive) date of the range
 * @param endDate **UTC midnight** date representing the end (inclusive) date of the range
 * @param slots how many *slots* to make available (defaults to 32)
 */
export function useMakeDatesAvailableMutation(
  startDate?: Timestamp,
  endDate?: Timestamp,
  slots?: number
) {
  return useMutation({
    mutationKey: ["make-dates-available"],
    mutationFn: () => {
      if (!startDate || !endDate) return new Promise(() => {})
      return AdminService.makeDatesAvailable(startDate, endDate, slots)
    },
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_AVAILABLITY_KEY] })

      queryClient.invalidateQueries({
        queryKey: [BOOKING_HISTORY_QUERY]
      })
    }
  })
}

/**
 * Hook for dealing with making dates unavailable
 *
 * @param startDate **UTC midnight** date representing the start (inclusive) date of the range
 * @param endDate **UTC midnight** date representing the end (inclusive) date of the range
 */
export function useMakeDatesUnavailableMutation(
  startDate?: Timestamp,
  endDate?: Timestamp
) {
  return useMutation({
    mutationKey: ["make-dates-unavailable"],
    retry: false,
    mutationFn: () => {
      if (!startDate || !endDate) return new Promise(() => {})
      return AdminService.makeDatesUnavailable(startDate, endDate)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_AVAILABLITY_KEY] })

      queryClient.invalidateQueries({
        queryKey: [BOOKING_HISTORY_QUERY]
      })
    }
  })
}

export function useAddUserToBookingMutation() {
  return useMutation({
    mutationKey: ["add-users-to-booking"],
    retry: false,
    mutationFn: AdminService.addUsersToBookingForDateRange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_BOOKINGS_BETWEEN_RANGE_QUERY]
      })

      queryClient.invalidateQueries({
        queryKey: [BOOKING_HISTORY_QUERY]
      })

      queryClient.invalidateQueries({
        queryKey: [BOOKING_AVAILABLITY_KEY]
      })
    }
  })
}

export function useDeleteBookingMutation() {
  return useMutation({
    mutationKey: ["delete-booking"],
    retry: false,
    mutationFn: AdminService.deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_BOOKINGS_BETWEEN_RANGE_QUERY]
      })

      queryClient.invalidateQueries({
        queryKey: [BOOKING_HISTORY_QUERY]
      })

      queryClient.invalidateQueries({
        queryKey: [BOOKING_AVAILABLITY_KEY]
      })
    }
  })
}

export function useCreateEventMutation() {
  return useMutation({
    mutationKey: ["create-booking"],
    retry: false,
    mutationFn: AdminService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_EVENTS_QUERY_KEY]
      })
    }
  })
}

export function useEditEventMutation() {
  return useMutation({
    mutationKey: ["edit-event"],
    retry: false,
    mutationFn: AdminService.editEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ALL_EVENTS_QUERY_KEY]
      })
    }
  })
}
