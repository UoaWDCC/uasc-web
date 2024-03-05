import fetchClient from "./FetchClient"

const UserService = {
  getUsers: async function () {
    const res = await fetchClient.GET("/users/{userId}", {
      params: {
        path: {
          userId: 1232
        }
      }
    })
    return res.data
  }
}

export default UserService
