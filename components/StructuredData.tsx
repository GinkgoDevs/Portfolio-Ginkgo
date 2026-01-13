"use client"

import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

export default function StructuredData() {
    const { locale } = useTranslation()
    const env = validateEnv()

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ginkgo Devs",
        url: env.siteUrl,
        logo: `${env.siteUrl}/Logos/SVG/logo-footer.svg`,
        description:
            locale === "es"
                ? "Desarrollo web profesional en Tucumán, Argentina. Creamos sitios web modernos, rápidos y optimizados para SEO."
                : "Professional web development in Tucumán, Argentina. We create modern, fast, and SEO-optimized websites.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Tucumán",
            addressCountry: "AR",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: env.contact.phone,
            email: env.contact.email,
            contactType: "Customer Service",
            availableLanguage: ["Spanish", "English"],
        },
        sameAs: [env.socialLinks.instagram, env.socialLinks.github].filter(Boolean),
    }

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Ginkgo Devs",
        url: env.siteUrl,
        description:
            locale === "es"
                ? "Soluciones digitales a medida para negocios que buscan impacto y escalabilidad."
                : "Custom digital solutions for businesses seeking impact and scalability.",
        inLanguage: [locale],
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${env.siteUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    }

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Ginkgo Devs",
        image: `${env.siteUrl}/Logos/SVG/logo-footer.svg`,
        "@id": env.siteUrl,
        url: env.siteUrl,
        telephone: env.contact.phone,
        email: env.contact.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Tucumán",
            addressCountry: "AR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -26.8083,
            longitude: -65.2176,
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
        },
        priceRange: "$$",
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
            />
        </>
    )
}
