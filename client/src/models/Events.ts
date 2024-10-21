import { components } from "./__generated__/schema"

export type CreateEventBody = components["schemas"]["CreateEventBody"]

export type Event = components["schemas"]["Event"] & { id?: string } // Assume all responses will return an Id
