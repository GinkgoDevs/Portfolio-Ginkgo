import { getRequestConfig } from "next-intl/server"
import { defaultLocale } from "./i18n.config"

export default getRequestConfig(async ({ locale }) => {
  try {
    return {
      messages: (await import(`./messages/${locale}.json`)).default,
    }
  } catch (error) {
    // Fallback to default locale if messages file not found
    return {
      messages: (await import(`./messages/${defaultLocale}.json`)).default,
    }
  }
})

