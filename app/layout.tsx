import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const metadata: Metadata = {
  title: "Ginkgo Devs",
  description: "Desarrollo Web y Soluciones Digitales",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    images: [
      {
        url: "/Logos/PNG/GGD_Imagotipo PRINCIPAL-5.png",
        width: 1200,
        height: 630,
        alt: "Ginkgo Devs Logo",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
