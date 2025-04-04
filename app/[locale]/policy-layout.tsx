"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PolicyLayoutProps {
  children: React.ReactNode
  title: {
    en: string
    es: string
  }
  locale: string
}

export default function PolicyLayout({ children, title, locale }: PolicyLayoutProps) {
  // Usar el locale pasado como prop en lugar del hook
  const isEnglish = locale === "en"

  return (
    <main className="min-h-screen bg-[#293B36] pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-[#D4F57A] hover:text-[#D4F57A]/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isEnglish ? "Back to home" : "Volver al inicio"}
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{isEnglish ? title.en : title.es}</h1>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/80">
              {isEnglish ? "Last updated: " : "Última actualización: "}
              {new Date().toLocaleDateString()}
            </p>

            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

