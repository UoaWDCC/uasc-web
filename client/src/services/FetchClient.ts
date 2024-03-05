import createClient from "openapi-fetch"
import type { paths } from "models/__generated__/schema"

const fetchClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
})

export default fetchClient
