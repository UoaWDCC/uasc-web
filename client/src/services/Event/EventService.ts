import fetchClient from "@/services/OpenApiFetchClient"

const EventService = {
  getAllEvents: async function (limit: number, cursor: string) {
    const { data } = await fetchClient.GET("/events", {
      params: {
        query: {
          limit,
          cursor
        }
      }
    })
    return data
  }
}
export default EventService
