import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ServiciosIAClient from "./servicios-ia-client"

const locales = ["en", "es"]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEnglish = locale === "en"

  return {
    title: isEnglish
      ? "Custom AI Agents | Ginkgo Devs"
      : "Agentes de IA a Medida | Ginkgo Devs",
    description: isEnglish
      ? "We design custom AI agents that automate processes, serve customers, and boost your business. WhatsApp, web, and chatbot integrations."
      : "Diseñamos agentes de IA a medida que automatizan procesos, atienden clientes y potencian tu negocio. Integraciones con WhatsApp, web y chatbot.",
    openGraph: {
      title: isEnglish
        ? "Custom AI Agents | Ginkgo Devs"
        : "Agentes de IA a Medida | Ginkgo Devs",
      type: "website",
    },
  }
}

export default async function ServiciosIAPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  return <ServiciosIAClient />
}
