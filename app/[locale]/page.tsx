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
      ? "Soluciones digitales a medida para negocios que buscan impacto y escalabilidad."
      : "Custom digital solutions for businesses seeking impact and scalability."

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
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

