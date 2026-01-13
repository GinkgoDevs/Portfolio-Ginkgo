import type { MetadataRoute } from "next"
import { validateEnv } from "@/lib/env"

export default function robots(): MetadataRoute.Robots {
  const env = validateEnv()
  const baseUrl = env.siteUrl

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

