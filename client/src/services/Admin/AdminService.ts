import { Timestamp } from "firebase/firestore"
import { UserAdditionalInfo } from "models/User"
import fetchClient from "services/OpenApiFetchClient"

export type EditUsersBody = {
  uid: string
  updatedInformation: UserAdditionalInfo
}[]
const AdminService = {
  getUsers: async function () {
    const { data } = await fetchClient.GET("/admin/users", {})
    if (!data) throw new Error("Failed to fetch all users")
    return data
  },
  editUsers: async function (users: EditUsersBody) {
    await fetchClient.PATCH("/admin/users/bulk-edit", {
      body: {
        users
      }
    })
  },
  demoteUser: async function (uid: string) {
    const { response } = await fetchClient.PUT("/admin/users/demote", {
      body: {
        uid
      }
    })
    if (!response.ok) throw new Error(`Failed to demote ${uid}`)
  },
  promoteUser: async function (uid: string) {
    const { response } = await fetchClient.PUT("/admin/users/promote", {
      body: {
        uid
      }
    })
    if (!response.ok) throw new Error(`Failed to promote ${uid}`)
  },
  makeDatesAvailable: async function (
    startDate: Timestamp,
    endDate: Timestamp
  ) {
    const { response, data } = await fetchClient.POST(
      "/admin/bookings/make-date-available",
      {
        body: {
          startDate,
          endDate
        }
      }
    )

    if (!response.ok)
      throw new Error(
        `Failed to make dates ${startDate.toString()} to ${endDate.toString()} available`
      )
    return data
  }
} as const

export default AdminService
