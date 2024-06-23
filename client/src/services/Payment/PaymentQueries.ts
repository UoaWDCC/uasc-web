import { useQuery } from "@tanstack/react-query"
import PaymentService from "./PaymentService"
import { MembershipTypes } from "models/Payment"

export const MEMBERSHIP_CLIENT_SECRET_KEY = "membershipClientSecret"

export function useMembershipClientSecretQuery(
  membershipType?: MembershipTypes
) {
  return useQuery({
    queryKey: [MEMBERSHIP_CLIENT_SECRET_KEY, membershipType],
    queryFn: () =>
      PaymentService.getMembershipPaymentClientSecret(membershipType),
    retry: 2,
    staleTime: 30000 // 30 Sec
  })
}
