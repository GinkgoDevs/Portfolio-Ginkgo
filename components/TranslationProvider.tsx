"use client"

import { createContext, useContext, type ReactNode } from "react"

type TranslationsContextType = {
  t: (key: string) => string
}

const TranslationsContext = createContext<TranslationsContextType>({
  t: (key) => key,
})

export function TranslationProvider({
  children,
  translations,
}: {
  children: ReactNode
  translations: Record<string, any>
}) {
  const t = (key: string) => {
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (!value || typeof value !== "object") return key
      value = value[k]
    }

    return typeof value === "string" ? value : key
  }

  return <TranslationsContext.Provider value={{ t }}>{children}</TranslationsContext.Provider>
}

export function useTranslations() {
  return useContext(TranslationsContext)
}

