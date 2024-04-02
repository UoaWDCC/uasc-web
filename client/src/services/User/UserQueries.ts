import { useQuery } from "@tanstack/react-query"
import UserService from "./UserService"

export function useUsersQuery() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => UserService.getUsers()
  })
}
