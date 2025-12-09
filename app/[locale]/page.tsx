import { Suspense } from "react"
import HomeClient from "./HomeClient"
import { locales } from "@/i18n.config"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = String(params.locale || "")

  if (!locales.includes(locale as any)) {
    return {}
  }

  const title =
    locale === "es"
      ? "Inicio | Ginkgo Devs - Desarrollo Web y Soluciones Digitales"
      : "Home | Ginkgo Devs - Web Development and Digital Solutions"

  const description =
    locale === "es"
      ? "Desarrollo web profesional en Tucumán, Argentina. Creamos sitios web modernos, rápidos y optimizados para SEO. Especialistas en Next.js, React y soluciones digitales a medida para impulsar tu negocio."
      : "Professional web development in Tucumán, Argentina. We create modern, fast, and SEO-optimized websites. Specialists in Next.js, React, and custom digital solutions to boost your business."

  return {
    title,
    description,
    keywords:
      locale === "es"
        ? "desarrollo web, diseño web, Tucumán, Argentina, Next.js, React, SEO, optimización web, sitios web modernos, desarrollo frontend, backend, soluciones digitales"
        : "web development, web design, Tucumán, Argentina, Next.js, React, SEO, web optimization, modern websites, frontend development, backend, digital solutions",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://ginkgodevs.com/${locale}`,
      siteName: "Ginkgo Devs",
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocalePage({
  params,
}: {
  params: { locale: string }
}) {
  const locale = String(params.locale || "")

  if (!locales.includes(locale as any)) {
    notFound()
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#293B36]" />}>
      <HomeClient />
    </Suspense>
  )
}

