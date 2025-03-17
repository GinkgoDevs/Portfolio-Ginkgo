"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

export default function JsonLd() {
  const { locale } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const env = validateEnv()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Use the env values instead of process.env
  const baseUrl = env.siteUrl

  // Datos estructurados para la organización
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ginkgo Devs",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      env.socialLinks.facebook,
      env.socialLinks.twitter,
      env.socialLinks.instagram,
      env.socialLinks.linkedin,
      env.socialLinks.github,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: env.contact.phone,
      contactType: "customer service",
      email: env.contact.email,
      availableLanguage: ["English", "Spanish"],
    },
    description:
      locale === "es"
        ? "Soluciones digitales a medida para negocios que buscan impacto y escalabilidad."
        : "Custom digital solutions for businesses seeking impact and scalability.",
  }

  // Datos estructurados para la página web
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    name: "Ginkgo Devs",
    description: locale === "es" ? "Desarrollo web y soluciones digitales" : "Web development and digital solutions",
    inLanguage: locale === "es" ? "es-ES" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  )
}

