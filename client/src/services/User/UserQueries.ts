import { useQuery } from "@tanstack/react-query"
import UserService from "./UserService"
// import { UserAdditionalInfo } from "server/src/data-layer/models/firebase"
// import FirestoreCollections from "server/src/data-layer/adapters/FirestoreCollections"

export function useUsersQuery() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => UserService.getUsers()
  })
}

// export async function getFilteredUsers(filters: Partial<UserAdditionalInfo>) {
//   let users = FirestoreCollections.users.get();
//   if (filters.membership){
//     users = users.where('membership', '==', filters.membership)
//   } else if (filters.first_name){
//     users = users.where('first_name', '==', filters.first_name)
//   } else if (filters.last_name){
//     users = users.where('last_name', '==', filters.last_name)
//   }
//   return users;
// }
