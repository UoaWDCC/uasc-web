import { MetadataRoute } from "next"

const FRONTEND_URL = process.env.FRONTEND_BASE_URL

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_CONFIG_ENV !== "production" || !FRONTEND_URL) {
    return {
      rules: {
        disallow: "*"
      }
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/profile"]
    },
    sitemap: `${FRONTEND_URL}/sitemap.xml`
  }
}
