import { components } from "models/__generated__/schema"
import fetchClient from "../OpenApiFetchClient"

type UserAdditionalInfo = components["schemas"]["UserAdditionalInfo"]
export type EditUsersBody = {
  uid: string
  updatedInformation: UserAdditionalInfo
}[]

const UserService = {
  getUsers: async function () {
    const { data } = await fetchClient.GET("/users", {})
    return data
  },
  editUsers: async function (users: EditUsersBody) {
    await fetchClient.PATCH("/users/bulk-edit", {
      body: {
        users
      }
    })
  }
} as const

export default UserService
