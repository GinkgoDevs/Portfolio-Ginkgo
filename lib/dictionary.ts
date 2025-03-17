import "server-only"
import type { Locale } from "@/i18n.config"
import { messages } from "@/i18n/messages"

export const getDictionary = async (locale: Locale) => {
  try {
    // Asegurarse de que locale sea un string válido
    const localeStr = String(locale)

    // Primero intentamos cargar desde archivos JSON
    return (await import(`../messages/${localeStr}.json`)).default
  } catch (error) {
    // Si falla, usamos los mensajes definidos en el código
    // Asegurarse de que locale sea una clave válida
    const safeLocale = typeof locale === "string" && (locale === "en" || locale === "es") ? locale : "es"

    return messages[safeLocale as keyof typeof messages] || messages.es
  }
}

