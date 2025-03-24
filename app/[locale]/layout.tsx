import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SkipToContent from "@/components/SkipToContent"
import { AccessibilityProvider } from "@/components/AccessibilityProvider"
import AccessibilityControls from "@/components/AccessibilityControls"
import { notFound } from "next/navigation"
import { locales } from "@/i18n.config"
import { TranslationProvider } from "@/contexts/TranslationContext"
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration"
import JsonLd from "@/components/JsonLd"
import { getDictionary } from "@/lib/dictionary"
import CookieConsent from "@/components/CookieConsent"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Metadata {
  return {
    title: "Ginkgo Devs",
    description: "Desarrollo Web y Soluciones Digitales",
    icons: {
      icon: [
        { url: '/favicon.ico' },
      ],
      shortcut: '/favicon.ico',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Extraer locale de params y asegurarse de que sea un string
  const locale = String(params.locale || "")

  // Verificar si el locale es válido
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as any)

  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="ginkgo-theme"
        >
          <AccessibilityProvider>
            <TranslationProvider locale={locale} messages={dictionary}>
              <SkipToContent />
              {children}
              <AccessibilityControls />
              <JsonLd />
              <CookieConsent />
            </TranslationProvider>
          </AccessibilityProvider> 
        </ThemeProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}