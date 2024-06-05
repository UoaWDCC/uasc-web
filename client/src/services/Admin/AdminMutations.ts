import { useMutation } from "@tanstack/react-query"
import AdminService from "./AdminService"
import { Timestamp } from "firebase/firestore"
import queryClient from "services/QueryClient"
import { BOOKING_AVAILABLITY_KEY } from "services/Booking/BookingQueries"

export function usePromoteUserMutation() {
  return useMutation({
    mutationKey: ["promote-user"],
    mutationFn: AdminService.promoteUser
  })
}

export function useDemoteUserMutation() {
  return useMutation({
    mutationKey: ["demote-user"],
    mutationFn: AdminService.demoteUser
  })
}

export function useMakeDatesAvailableMutation(
  startDate?: Timestamp,
  endDate?: Timestamp
) {
  return useMutation({
    mutationKey: ["make-dates-available"],
    mutationFn: () => {
      if (!startDate || !endDate) return new Promise(() => {})
      return AdminService.makeDatesAvailable(startDate, endDate)
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
