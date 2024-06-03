import { useMutation } from "@tanstack/react-query"
import AdminService from "./AdminService"

export function usePromoteUserMutation() {
  return useMutation({
    mutationKey: ["promote-user"],
    mutationFn: AdminService.promoteUser
  })
}

export function useDemoteUserMutation() {
  return useMutation({
    mutationKey: ["demote-user"],
    mutationFn: AdminService.demoteUser
  })
}
