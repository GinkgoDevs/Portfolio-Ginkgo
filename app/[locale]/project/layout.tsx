import type { ReactNode } from "react"
import type { Locale } from "@/i18n.config"

export default function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: Locale }
}) {
  return <main>{children}</main>
}

