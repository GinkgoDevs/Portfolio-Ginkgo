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
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import "./globals.css"



import './globals.css'