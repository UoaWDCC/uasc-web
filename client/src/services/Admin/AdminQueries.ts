import { useInfiniteQuery } from "@tanstack/react-query"
import AdminService from "./AdminService"

export function useUsersQuery() {
  return useInfiniteQuery({
    queryKey: ["allUsers"],
    queryFn: AdminService.getUsers,
    retry: 1,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}
