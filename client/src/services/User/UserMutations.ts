import { UseMutationOptions, useMutation } from "@tanstack/react-query"
import UserService, { EditUsersBody } from "./UserService"

export function useEditUserMutation(
  users: EditUsersBody,
  options: UseMutationOptions
) {
  return useMutation({
    ...options,
    mutationFn: () => UserService.editUsers(users)
  })
}
