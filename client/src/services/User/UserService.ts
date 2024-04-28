import fetchClient from "../OpenApiFetchClient"
import { UserAdditionalInfo, ReducedUserAdditionalInfo } from "models/User"

export type SignUpUserBody = {
  email: string
  user: ReducedUserAdditionalInfo
}
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
  },
  signUpUser: async function (userData: SignUpUserBody) {
    // gets data from signup and returns data (all data needed after signing up)
    const { data, error } = await fetchClient.POST("/signup", {
      body: userData
    })
    return data || error
  }
} as const

export default UserService
