import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // Hardcoded baseUrl instead of using environment variable
  const baseUrl = "https://www.ginkgodevs.com"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

