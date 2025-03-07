import "./globals.css"
import { Inter } from "next/font/google"
import Footer from "@/components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ginkgo Devs Portfolio",
  description: "Web development duo transforming ideas into functional and attractive solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'