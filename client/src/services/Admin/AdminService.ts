import { Timestamp } from "firebase/firestore"
import { UserAdditionalInfo } from "models/User"
import fetchClient from "services/OpenApiFetchClient"
import { MEMBER_TABLE_MAX_DATA } from "utils/Constants"

export type EditUsersBody = {
  uid: string
  updatedInformation: UserAdditionalInfo
}[]

const AdminService = {
  getUsers: async function ({
    limit = MEMBER_TABLE_MAX_DATA,
    pageParam
  }: {
    pageParam?: string
    limit?: number
  }) {
    const { data } = await fetchClient.GET("/admin/users", {
      params: {
        query: {
          cursor: pageParam,
          toFetch: limit
        }
      }
    })
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
  getBookingsBetweenDateRange: async function ({
    startDate = Timestamp.fromDate(new Date()),
    endDate = Timestamp.fromDate(new Date())
  }: {
    startDate?: Timestamp
    endDate?: Timestamp
  }) {
    const { data, response } = await fetchClient.POST("/bookings/fetch-users", {
      body: {
        startDate,
        endDate
      }
    })

    if (!response.ok)
      throw new Error(
        `Failed to fetch bookings between ${startDate} to ${endDate}`
      )

    return data?.data
  },

  makeDatesAvailable: async function (
    startDate: Timestamp,
    endDate: Timestamp,
    slots?: number
  ) {
    const { response, data } = await fetchClient.POST(
      "/admin/bookings/make-dates-available",
      {
        body: {
          startDate,
          endDate,
          slots
        }
      }
    )

    if (!response.ok)
      throw new Error(
        `Failed to make dates ${startDate.toString()} to ${endDate.toString()} available`
      )
    return data
  },

  makeDatesUnavailable: async function (
    startDate: Timestamp,
    endDate: Timestamp
  ) {
    const { response, data } = await fetchClient.POST(
      "/admin/bookings/make-dates-unavailable",
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
