import { useQuery } from "@tanstack/react-query"
import AppDataService from "./AppDataService"

export function useBankPaymentDetailsQuery() {
  return useQuery({
    queryKey: ["BankPaymentDetails"],
    queryFn: () => AppDataService.getBankPaymentDetails(),
    // persist across session lifetime
    staleTime: Infinity
  })
}

export function useMembershipPricesQuery() {
  return useQuery({
    queryKey: ["MembershipPricings"],
    queryFn: () => AppDataService.getMembershipPricingDetails(),
    // persist across session lifetime
    staleTime: Infinity
  })
}
