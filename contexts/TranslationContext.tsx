"use client"

import { createContext, useContext, type ReactNode } from "react"

type TranslationContextType = {
  t: (key: string) => string
  locale: string
}

const TranslationContext = createContext<TranslationContextType>({
  t: (key) => key,
  locale: "es",
})

export function TranslationProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode
  locale: string
  messages?: Record<string, any>
}) {
  // Asegurarse de que locale sea un string
  const safeLocale = typeof locale === "string" ? locale : "es"

  // Modificar la función t para que soporte interpolación de variables
  const t = (key: string, replacements?: Record<string, string>): string => {
    if (!messages) return key

    // Asegurarse de que key sea un string
    const safeKey = typeof key === "string" ? key : String(key)

    const keys = safeKey.split(".")
    let value: any = messages

    for (const k of keys) {
      if (!value || typeof value !== "object") {
        // En producción, no mostramos advertencias en la consola
        if (process.env.NODE_ENV !== "production") {
          console.warn(`Translation key not found: ${safeKey}`)
        }
        return safeKey
      }
      value = value[k]
    }

    if (typeof value !== "string") {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Translation value is not a string for key: ${safeKey}`)
      }
      return safeKey
    }

    // Si hay reemplazos, aplicarlos al texto
    if (replacements) {
      return Object.entries(replacements).reduce((text, [key, val]) => {
        return text.replace(new RegExp(`\\{${key}\\}`, "g"), val)
      }, value)
    }

    return value
  }

  return <TranslationContext.Provider value={{ t, locale: safeLocale }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  return useContext(TranslationContext)
}
