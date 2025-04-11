// Asegurarse de que la función validateEnv use correctamente las variables de entorno

export function validateEnv() {
  // Verificar variables de entorno requeridas
  const requiredEnvs = [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_INSTAGRAM_URL",
    "NEXT_PUBLIC_LINKEDIN_URL",
    "NEXT_PUBLIC_GITHUB_URL",
    "NEXT_PUBLIC_CONTACT_PHONE",
    "NEXT_PUBLIC_CONTACT_EMAIL",
    "NEXT_PUBLIC_WHATSAPP_NUMBER",
  ]

  // En desarrollo, advertir sobre variables de entorno faltantes
  if (process.env.NODE_ENV === "development") {
    requiredEnvs.forEach((env) => {
      if (!process.env[env]) {
        console.warn(`⚠️ Missing environment variable: ${env}`)
      }
    })
  }

  // Devolver valores de las variables de entorno o valores predeterminados
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ginkgodevs.com",
    socialLinks: {
      instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
      linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com",
      github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com",
    },
    contact: {
      phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1234567890",
      email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@ginkgodevs.com",
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491112345678",
    },
  }
}
 