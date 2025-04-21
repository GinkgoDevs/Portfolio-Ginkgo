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
import FloatingActionButtons from "@/components/FloatingActionButtons"
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
      icon: [{ url: "/favicon.ico" }],
      shortcut: "/favicon.ico",
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
        <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KP3XLTJN');</script>
<!-- End Google Tag Manager -->
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KP3XLTJN"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
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
              <FloatingActionButtons />
            </TranslationProvider>
          </AccessibilityProvider>
        </ThemeProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}

