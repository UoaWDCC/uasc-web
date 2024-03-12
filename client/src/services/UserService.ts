import fetchClient from "./OpenApiFetchClient"

const UserService = {
  getUsers: async function () {
    const { data } = await fetchClient.GET("/users", {})
    return data
  }
} as const

export default UserService
