import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingContactButton from "@/components/FloatingContactButton"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ginkgo Devs Portfolio",
  description: "Web development duo transforming ideas into functional and attractive solutions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <FloatingContactButton />
      </body>
    </html>
  )
}



import './globals.css'