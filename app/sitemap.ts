import { locales } from "@/i18n.config"

export default async function sitemap() {
  // Hardcoded baseUrl instead of using environment variable
  const baseUrl = "https://www.ginkgodevs.com"

  // URLs básicas para cada idioma
  const localizedRoutes = locales.flatMap((locale) => {
    return [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      // Añade aquí otras rutas específicas cuando las tengas
    ]
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...localizedRoutes,
  ]
}

