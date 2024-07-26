import { Timestamp } from "firebase/firestore"
import { UserAdditionalInfo } from "@/models/User"
import fetchClient from "@/services/OpenApiFetchClient"
import { MEMBER_TABLE_MAX_DATA } from "@/utils/Constants"

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
  deleteBooking: async function (id: string) {
    const { response } = await fetchClient.POST("/admin/bookings/delete", {
      body: {
        bookingID: id
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to delete booking with id ${id}`)
    }
  },
  getBookingsBetweenDateRange: async function ({
    startDate = Timestamp.fromDate(new Date(Date.now())),
    endDate = Timestamp.fromDate(new Date(Date.now()))
  }: {
    startDate?: Timestamp
    endDate?: Timestamp
  }) {
    /**
     * We can **NOT** have any nanoseconds because it causes weird offset problems
     */
    const _startDate = { seconds: startDate.seconds, nanoseconds: 0 }
    const _endDate = { seconds: endDate.seconds, nanoseconds: 0 }

    const { data, response } = await fetchClient.POST("/bookings/fetch-users", {
      body: {
        startDate: _startDate,
        endDate: _endDate
      }
    })

    if (!response.ok)
      throw new Error(
        `Failed to fetch bookings between ${startDate} to ${endDate}`
      )

    return data?.data
  },

  deleteUser: async function ({ uid }: { uid: string }) {
    const { response } = await fetchClient.DELETE("/users/delete-user", {
      body: {
        uid
      }
    })
    if (!response.ok) throw new Error(`Failed to delete user ${uid}`)
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
  },
  addUsersToBookingForDateRange: async function ({
    startDate,
    endDate,
    userIds
  }: {
    startDate: Timestamp
    endDate: Timestamp
    userIds: string[]
  }) {
    const { response, data } = await fetchClient.POST(
      "/bookings/create-bookings",
      {
        body: {
          startDate,
          endDate,
          userIds
        }
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to add the users ${userIds.join(",")} to the date range ${startDate.toString()} to ${endDate.toString()} `
      )
    }

    return data?.data
  }
} as const

export default AdminService
