import { useMutation } from "@tanstack/react-query"
import AdminService from "./AdminService"
import { Timestamp } from "firebase/firestore"
import queryClient from "services/QueryClient"
import { BOOKING_AVAILABLITY_KEY } from "services/Booking/BookingQueries"
import { ALL_USERS_QUERY } from "./AdminQueries"
import { CombinedUserData } from "models/User"
import { replaceUserInPage } from "./AdminUtils"

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
    }
  })
}

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
    }
  })
}
