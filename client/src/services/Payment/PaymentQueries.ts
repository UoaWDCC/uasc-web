import { useQuery } from "@tanstack/react-query"
import PaymentService from "./PaymentService"

export function useMembershipClientSecretQuery() {
  return useQuery({
    queryKey: ["membershipClientSecret"],
    queryFn: () => PaymentService.getMembershipPaymentClientSecret(),
    staleTime: 30000
  })
}
