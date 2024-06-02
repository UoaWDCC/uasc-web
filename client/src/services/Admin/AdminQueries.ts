import { useQuery } from "@tanstack/react-query"
import AdminService from "./AdminService"

export function useUsersQuery() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => AdminService.getUsers(),
    retry: 3
  })
}
