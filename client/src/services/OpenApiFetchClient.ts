import createClient, { type Middleware } from "openapi-fetch"
import type { paths } from "@/models/__generated__/schema"

let accessToken: string | undefined

export const setToken = (token: string | undefined) => {
  accessToken = token
}

const authMiddleware: Middleware = {
  async onRequest(req) {
    if (accessToken) {
      req.headers.set("Authorization", `Bearer ${accessToken}`)
    }
    return req
  }
}

const fetchClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL
})

fetchClient.use(authMiddleware)

export default fetchClient
