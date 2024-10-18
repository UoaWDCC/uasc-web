import fetchClient from "../OpenApiFetchClient"

const EventService = {
  getAllEvents: async function ({ pageParam }: { pageParam?: string }) {
    const { data, response } = await fetchClient.GET("/events", {
      params: {
        query: {
          limit: 15,
          cursor: pageParam
        }
      }
    })

    if (!response.ok || !data) {
      throw new Error("Failed to fetch all events")
    }

    return data
  }
} as const

export default EventService
