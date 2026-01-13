import { locales } from "@/i18n.config"
import { projects } from "@/data/projects"
import { validateEnv } from "@/lib/env"

export default async function sitemap() {
  const env = validateEnv()
  const baseUrl = env.siteUrl

  // Generar URLs para cada proyecto y cada idioma
  const projectRoutes = projects.flatMap((project) => {
    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}/project/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  })

  // URLs básicas para cada idioma
  const localizedRoutes = locales.flatMap((locale) => {
    return [
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      ...projectRoutes.filter((route) => route.url.includes(`/${locale}/`)),
    ]
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    ...localizedRoutes,
  ]
}

