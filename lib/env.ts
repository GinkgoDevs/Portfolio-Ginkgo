// Comment out the environment variable validation and provide default values
export function validateEnv() {
  // Commented out environment variable validation
  /*
  const requiredEnvs = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_FACEBOOK_URL',
    'NEXT_PUBLIC_TWITTER_URL',
    'NEXT_PUBLIC_INSTAGRAM_URL',
    'NEXT_PUBLIC_LINKEDIN_URL',
    'NEXT_PUBLIC_GITHUB_URL',
    'NEXT_PUBLIC_CONTACT_PHONE',
    'NEXT_PUBLIC_CONTACT_EMAIL'
  ]

  // In development, warn about missing env vars
  if (process.env.NODE_ENV === 'development') {
    requiredEnvs.forEach(env => {
      if (!process.env[env]) {
        console.warn(`⚠️ Missing environment variable: ${env}`)
      }
    })
  }
  */

  // Provide default values instead of using environment variables
  return {
    siteUrl: "https://www.ginkgodevs.com",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    contact: {
      phone: "+1234567890",
      email: "hello@ginkgodevs.com",
    },
  }
}

