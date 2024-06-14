import fetchClient from "../OpenApiFetchClient"
import { ReducedUserAdditionalInfo } from "models/User"

export type SignUpUserBody = {
  email: string
  user: ReducedUserAdditionalInfo
}

const UserService = {
  signUpUser: async function (userData: SignUpUserBody) {
    // gets data from signup and returns data (all data needed after signing up)
    const { data, error } = await fetchClient.POST("/signup", {
      body: userData
    })
    return data || error
  },
  editSelf: async function (userData: Partial<ReducedUserAdditionalInfo>) {
    const { response } = await fetchClient.PATCH("/users/edit-self", {
      body: { updatedInformation: userData }
    })
    if (!response.ok)
      throw new Error("Something went wrong when editing self data")
  }
} as const

export default UserService
