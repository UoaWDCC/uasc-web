import { useMutation } from "@tanstack/react-query"
import UserService, { EditUsersBody } from "./UserService"

export function useEditUserMutation(users: EditUsersBody) {
  return useMutation({
    mutationFn: () => UserService.editUsers(users)
  })
}
