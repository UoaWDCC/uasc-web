import { useQuery } from "@tanstack/react-query"
import UserService from "./UserService"

export const useUsers = useQuery({
  queryKey: ["allUsers"],
  queryFn: () => UserService.getUsers()
})
