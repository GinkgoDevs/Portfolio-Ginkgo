import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
  if (!locale) throw new Error("Missing locale")
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale,
  }
})

