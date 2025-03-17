import { defaultLocale } from "@/i18n.config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ginkgo Devs",
  description: "Desarrollo Web y Soluciones Digitales",
  alternates: {
    canonical: `/${defaultLocale}`,
  },
}

export default function Home() {
  // Esta página nunca se renderizará debido a la redirección en metadata
  return null
}

