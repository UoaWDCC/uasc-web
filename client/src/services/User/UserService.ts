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
  }
} as const

export default UserService
