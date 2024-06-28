import { useQuery } from "@tanstack/react-query"
import UserService from "./UserService"

export const SELF_DATA_QUERY_KEY = "get-self" as const

export function useSelfDataQuery() {
  return useQuery({
    queryKey: [SELF_DATA_QUERY_KEY],
    queryFn: UserService.getSelfData
  })
}
