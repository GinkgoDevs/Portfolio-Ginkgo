import type React from "react"
import { Inter, Outfit } from "next/font/google"
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
import CustomCursor from "@/components/ui/CustomCursor"
import ScrollProgress from "@/components/ui/ScrollProgress"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = "https://ginkgodevs.com" // Update with real URL if known

  return {
    title: {
      default: "Ginkgo Devs | Desarrollo Web y Soluciones Digitales",
      template: "%s | Ginkgo Devs",
    },
    description: "Expertos en soluciones digitales, desarrollo web a medida y transformación tecnológica.",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
      languages: {
        "es-ES": "/es",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: siteUrl,
      siteName: "Ginkgo Devs",
      title: "Ginkgo Devs | Desarrollo Web a Medida",
      description: "Transformamos tus ideas en realidades digitales de alto impacto.",
      images: [
        {
          url: "/Logos/PNG/GGD_Imagotipo PRINCIPAL-5.png",
          width: 1200,
          height: 630,
          alt: "Ginkgo Devs - Soluciones Digitales",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ginkgo Devs | Soluciones Digitales",
      description: "Desarrollo web moderno con foco en rendimiento y diseño.",
      images: ["/Logos/PNG/GGD_Imagotipo PRINCIPAL-5.png"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Extraer locale de params y asegurarse de que sea un string
  const { locale } = await params

  // Verificar si el locale es válido
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as any)

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KP3XLTJN');`
        }} />
        {/* End Google Tag Manager */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={inter.className}>
        <ScrollProgress />
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KP3XLTJN"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        {/* End Google Tag Manager (noscript) */}
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

