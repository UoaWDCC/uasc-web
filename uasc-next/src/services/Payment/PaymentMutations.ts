import { useMutation } from "@tanstack/react-query"
import PaymentService from "./PaymentService"

/**
 * Key for booking client secret mutation
 */
export const BOOKING_CLIENT_SECRET_KEY = "bookingClientSecret" as const

export function useBookingPaymentClientSecretMutation() {
  return useMutation({
    mutationKey: [BOOKING_CLIENT_SECRET_KEY],
    mutationFn: PaymentService.getBookingPaymentClientSecret,
    retry: 0
  })
}
