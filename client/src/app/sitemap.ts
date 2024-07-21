import { MetadataRoute } from "next"

const FRONTEND_URL = process.env.FRONTEND_BASE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.NEXT_CONFIG_ENV !== "production" || !FRONTEND_URL) return []

  return [
    {
      url: FRONTEND_URL,
      priority: 1
    },
    {
      url: `${FRONTEND_URL}/about`,
      priority: 2
    },
    {
      url: `${FRONTEND_URL}/contact`,
      priority: 3
    },
    {
      url: `${FRONTEND_URL}/events`
    },
    {
      url: `${FRONTEND_URL}/login`,
      priority: 4
    }
  ]
}
