import { useInfiniteQuery } from "@tanstack/react-query"
import AdminService from "./AdminService"

export const ALL_USERS_QUERY = "allUsers"

export function useUsersQuery() {
  return useInfiniteQuery({
    queryKey: [ALL_USERS_QUERY],
    queryFn: AdminService.getUsers,
    retry: 1,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
