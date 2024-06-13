import { useMutation } from "@tanstack/react-query"
import PaymentService from "./PaymentService"

export function useBookingPaymentClientSecretMutation() {
  return useMutation({
    mutationKey: ["bookingClientSecret"],
    mutationFn: PaymentService.getBookingPaymentClientSecret,
    retry: 0
  })
}
