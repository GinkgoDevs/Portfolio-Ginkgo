// Asegurarse de que los locales sean strings
export const defaultLocale = "es"
export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]

