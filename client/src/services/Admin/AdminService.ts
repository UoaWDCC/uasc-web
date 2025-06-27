import { Timestamp } from "firebase/firestore"
import type { CreateEventBody, EditEventBody } from "@/models/Events"
import type { UserAdditionalInfo } from "@/models/User"
import fetchClient from "@/services/OpenApiFetchClient"
import { MEMBER_TABLE_MAX_DATA } from "@/utils/Constants"

export type EditUsersBody = {
  uid: string
  updatedInformation: UserAdditionalInfo
}[]

/**
 * Mirrored from the backend type
 */
enum RedirectKeys {
  MEMBERS_GOOGLE_SHEET_LINK = "MEMBERS_GOOGLE_SHEET_LINK"
}

const AdminService = {
  getUsers: async ({
    limit = MEMBER_TABLE_MAX_DATA,
    pageParam
  }: {
    pageParam?: string
    limit?: number
  }) => {
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
  editUsers: async (users: EditUsersBody) => {
    await fetchClient.PATCH("/admin/users/bulk-edit", {
      body: {
        users
      }
    })
  },
  demoteUser: async (uid: string) => {
    const { response } = await fetchClient.PUT("/admin/users/demote", {
      body: {
        uid
      }
    })
    if (!response.ok) throw new Error(`Failed to demote ${uid}`)
  },
  promoteUser: async (uid: string) => {
    const { response } = await fetchClient.PUT("/admin/users/promote", {
      body: {
        uid
      }
    })
    if (!response.ok) throw new Error(`Failed to promote ${uid}`)
  },
  deleteBooking: async (id: string) => {
    const { response } = await fetchClient.POST("/admin/bookings/delete", {
      body: {
        bookingID: id
      }
    })
    if (!response.ok) {
      throw new Error(`Failed to delete booking with id ${id}`)
    }
  },
  getBookingsBetweenDateRange: async ({
    startDate = Timestamp.fromDate(new Date(Date.now())),
    endDate = Timestamp.fromDate(new Date(Date.now()))
  }: {
    startDate?: Timestamp
    endDate?: Timestamp
  }) => {
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

  deleteUser: async ({ uid }: { uid: string }) => {
    const { response } = await fetchClient.DELETE("/users/delete-user", {
      body: {
        uid
      }
    })
    if (!response.ok) throw new Error(`Failed to delete user ${uid}`)
  },

  makeDatesAvailable: async (
    startDate: Timestamp,
    endDate: Timestamp,
    slots?: number
  ) => {
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

  makeDatesUnavailable: async (startDate: Timestamp, endDate: Timestamp) => {
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
  addUsersToBookingForDateRange: async ({
    startDate,
    endDate,
    userId
  }: {
    startDate: Timestamp
    endDate: Timestamp
    userId: string
  }) => {
    const { response, data } = await fetchClient.POST(
      "/admin/bookings/create",
      {
        body: {
          startDate,
          endDate,
          userId
        }
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to add the user, ${userId} to the date range ${startDate.toString()} to ${endDate.toString()} `
      )
    }

    return data?.data
  },
  getBookingHistory: async ({
    pageParam,
    limit = 200
  }: {
    pageParam?: string
    limit?: number
  }) => {
    const { response, data } = await fetchClient.GET(
      "/admin/bookings/history",
      {
        params: {
          query: {
            limit,
            cursor: pageParam
          }
        }
      }
    )

    if (!response.ok || !data) {
      throw new Error(`Failed to fetch ${limit} of the latest booking items`)
    }

    return data
  },
  createEvent: async ({ data }: CreateEventBody) => {
    const { response } = await fetchClient.POST("/admin/events", {
      body: { data }
    })

    if (!response.ok) {
      throw new Error(`Failed to create the event ${data.title}`)
    }
  },
  editEvent: async ({
    eventId,
    newData
  }: {
    eventId: string
    newData: EditEventBody
  }) => {
    const { response } = await fetchClient.PATCH("/admin/events/{id}", {
      params: {
        path: {
          id: eventId
        }
      },
      body: { ...newData }
    })

    if (!response.ok) {
      throw new Error(
        `Failed to edit the event ${newData.title} with id ${eventId}`
      )
    }
  },
  getEvent: async (eventId: string) => {
    const { response, data } = await fetchClient.GET("/admin/events/{id}", {
      params: {
        path: { id: eventId }
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data for event with id ${eventId}`)
    }

    return data?.data
  },
  deleteEvent: async (eventId: string) => {
    const { response } = await fetchClient.DELETE("/admin/events/{id}", {
      params: {
        path: {
          id: eventId
        }
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to delete event with id ${eventId}`)
    }
  },
  resetMemberships: async () => {
    const { response } = await fetchClient.PATCH("/admin/users/demote-all")

    if (!response.ok) {
      throw new Error(`Failed to demote all users`)
    }
  },
  getMemberGoogleSheetUrl: async () => {
    const { response, data } = await fetchClient.GET(
      "/admin/redirect/{redirectKey}",
      {
        params: {
          path: {
            redirectKey: RedirectKeys.MEMBERS_GOOGLE_SHEET_LINK
          }
        }
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch Google Sheet URL")
    }

    return data?.url
  }
} as const

export default AdminService
