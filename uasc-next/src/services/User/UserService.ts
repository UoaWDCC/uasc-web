import fetchClient from "../OpenApiFetchClient"
import { ReducedUserAdditionalInfo } from "@/models/User"

export type SignUpUserBody = {
  email: string
  user: ReducedUserAdditionalInfo
}

const UserService = {
  getSelfData: async function () {
    const { data, response } = await fetchClient.GET("/users/self")
    if (!response.ok) {
      throw new Error(
        "There was a problem fetching the user data for the current user"
      )
    }

    return data
  },
  signUpUser: async function (userData: SignUpUserBody) {
    // gets data from signup and returns data (all data needed after signing up)
    const { data, response } = await fetchClient.POST("/signup", {
      body: userData
    })

    if (response.status === 400)
      throw new Error(
        "Invalid details, double check to see if the details are correct"
      )

    if (response.status === 409)
      throw new Error(
        `An account already exists with the email ${userData.email}`
      )

    if (!response.ok)
      throw new Error(
        `Something went wrong when signing up user ${userData.email}`
      )

    return data
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
